import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorState } from '@codemirror/state';
import { EditorView, Tooltip, hoverTooltip, repositionTooltips } from '@codemirror/view';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import CodeMirror from 'codemirror';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/clike/clike.js'; // C, C++, Java
import 'codemirror/mode/htmlmixed/htmlmixed.js'; // HTML
import 'codemirror/mode/css/css.js'; // CSS
import 'codemirror/mode/sql/sql.js'; // SQL
import 'codemirror/addon/fold/foldgutter.js'; // Fold gutter
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/display/placeholder.js'; // For placeholder text
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [FormsModule, CodemirrorModule, CommonModule],
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit, AfterViewInit {
  code: string = ''; // Code written in the editor
  fileName: string = 'untitled';
  output: string = '';

  codeContent: string = '';
  selectedExtension: string = 'txt';
  isEditingFileName: boolean = false;
  toggleEditFileName() {
    this.isEditingFileName = !this.isEditingFileName;
  }

  onFileNameChange() {
    if (!this.fileName) {
      this.fileName = 'Untitled'; // Reset to default if input is empty
    }
  }

  onExtensionChange() {
    // You can handle any specific logic when the extension changes if needed
  }

  save2File() {
    const blob = new Blob([this.codeContent], { type: 'text/plain' });
    const a = document.createElement('a');
    const file = new File([blob], `${this.fileName}.${this.selectedExtension}`, { type: blob.type });

    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = file.name;
    a.click();

    // Clean up URL object
    URL.revokeObjectURL(url);
  }

  showTerminal: any;
  decreaseFontSize() {
    throw new Error('Method not implemented.');
  }
  increaseFontSize() {
    throw new Error('Method not implemented.');
  }

  toggleTerminal() {
    throw new Error('Method not implemented.');
  }

  editor!: CodeMirror.EditorFromTextArea;
  defaultFontSize: number = 14; // Font size default
  isDarkMode: boolean = false; // Toggle for dark mode

  // Default code snippets for each language
  codeSnippets: { [key: string]: string } = {
    javascript: `// JavaScript Example
function greet() {
  console.log("Hello, World!");
}
greet();`,

    python: `# Python Example
def greet():
    print("Hello, World!")
greet()`,

    "text/x-csrc": `// C Example
#include <stdio.h>
int main() {
   printf("Hello, World!");
   return 0;
}`,

    "text/x-c++src": `// C++ Example
#include <iostream>
using namespace std;

int main() {
   cout << "Hello, World!" << endl;
   return 0;
}`,

    java: `// Java Example
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,

    htmlmixed: `<!-- HTML Example -->
<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,

    css: `/* CSS Example */
body {
    background-color: #f0f0f0;
    color: #333;
}`,

    sql: `-- SQL Example
SELECT * FROM users WHERE id = 1;`
  };


  customCompletions: { [key: string]: any[] } = {
    javascript: [
      { text: 'console.log', displayText: 'console.log()' },
      { text: 'function', displayText: 'function() {}' },
    ],
    python: [
      { text: 'print', displayText: 'print()' },
      { text: 'def', displayText: 'def function_name():' },
    ],
    c: [
      { text: 'printf', displayText: 'printf("format", args);' },
      { text: 'int main', displayText: 'int main() { return 0; }' },
    ],
    cplusplus: [
      { text: 'cout', displayText: 'std::cout << ' },
      { text: 'int main', displayText: 'int main() { return 0; }' },
    ],
    java: [
      { text: 'System.out.println', displayText: 'System.out.println();' },
      { text: 'public static void main', displayText: 'public static void main(String[] args) {}' },
    ],
    sql: [
      { text: 'SELECT', displayText: 'SELECT * FROM table_name;' },
      { text: 'INSERT INTO', displayText: 'INSERT INTO table_name (column1, column2) VALUES (value1, value2);' },
    ]
  };

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const codeElement = document.getElementById("code") as HTMLTextAreaElement;
    if (codeElement) {
      this.editor = CodeMirror.fromTextArea(codeElement, {
        lineNumbers: true,
        lineWrapping: true,
        lint: true,
        theme: "default", // Default theme
        mode: "javascript", // Default language mode


        extraKeys: {
          "Ctrl-Space": "autocomplete", // Enable autocomplete
          "Ctrl-S": () => this.saveCode(),
          'Ctrl-Z': () => this.undo(),
          'Ctrl-Y': () => this.redo(),
          "Shift-Enter": () => this.runCode() // Add custom keyboard shortcut for saving
        },
        viewportMargin: 4,
        foldGutter: true,
        matchBrackets: true,
        styleActiveLine: true,
        autoCloseBrackets: true,
        placeholder: "Write your code here...",// Default placeholder text
        autocorrect: true,


        // Highlight active line

      });

      // Set the default JavaScript code snippet initially
      this.editor.getDoc().setValue(this.codeSnippets["javascript"]);
      this.editor.on("inputRead", (cm, change) => {
        const cursor = cm.getCursor();
        const token = cm.getTokenAt(cursor);
        if (token.string === "") {
          return; // Don't show completions on empty tokens
        }

        // Show custom completions based on the current mode
        const completions = this.getCompletions(token.string);
        if (completions.length) {
          cm.showHint({ hint: () => ({ list: completions, from: cm.getCursor(), to: cm.getCursor() }) });
        }
      });
    }
  }



  getCompletions(token: string): string[] {
    const completions: { [key: string]: string[] } = {
      javascript: ['console', 'document', 'window'],
      python: ['print', 'len', 'range'],
      'text/x-csrc': ['printf', 'scanf', 'main'],
      'text/x-c++src': ['cout', 'cin', 'main'],
      java: ['System.out.println', 'int', 'String'],
      sql: ['SELECT', 'FROM', 'WHERE']
    };

    const currentMode = this.editor.getOption("mode") as string;
    return completions[currentMode]?.filter(completion => completion.startsWith(token)) || [];
  }

  saveFile() {
    // Get the current code from the editor
    const currentCode = this.editor.getValue();

    // Create a blob from the code
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });

    // Use file-saver to save the file
    saveAs(blob, this.fileName);
  }

  // Prompt for a custom filename
  promptFileName() {
    const name = prompt('Enter file name:', this.fileName);
    if (name) {
      this.fileName = name.endsWith('.txt') ? name : `${name}.txt`; // Ensure the extension
      this.saveFile();
    }
  }

  saveFileAsPDF() {
    const doc = new jsPDF();
    const currentCode = this.editor.getValue();
    doc.text(currentCode, 10, 10); // Add the code to the PDF
    doc.save(this.fileName.replace('.txt', '.pdf')); // Save the PDF
  }

  // Adjust your promptFileName to call this method instead if needed
  promptFilesName() {
    const name = prompt('Enter file name:', this.fileName);
    if (name) {
      this.fileName = name.endsWith('.pdf') ? name : `${name}.pdf`; // Ensure the extension
      this.saveFileAsPDF();
    }
  }

  runCode() {
    const code = this.editor.getValue();
    const language = this.editor.getOption("mode");
    const outputArea = document.getElementById("output") as HTMLPreElement;

    // Simulate code execution (this is just a placeholder)
    switch (language) {
      case "javascript":
        this.runJavaScript(code, outputArea);
        // alert(`Running JavaScript code:\n${code}`);
        // You can execute JavaScript in a sandbox or environment here
        break;
      case "python":
        alert(`Running Python code:\n${code}`);
        // Call a backend API to run Python code
        break;
      case "text/x-csrc":
        alert(`Running C code:\n${code}`);
        // Call a backend API to run C code
        break;
      case "text/x-c++src":
        alert(`Running C++ code:\n${code}`);
        // Call a backend API to run C++ code
        break;
      case "java":
        alert(`Running Java code:\n${code}`);
        // Call a backend API to run Java code
        break;
      case "sql":
        alert(`Running SQL code:\n${code}`);
        // Call a backend API to run SQL code
        break;
      default:
        alert('Unsupported language');
    }
  }

  runJavaScript(code: string, outputArea: HTMLPreElement) {
    try {
      const log: string[] = [];
      const customConsole = {
        log: (msg: any) => log.push(String(msg)), // Capture logs
      };

      // Create a new function to run the code
      const result = new Function('console', code)(customConsole);

      // Display the captured logs or the result
      outputArea.textContent = log.length > 0 ? log.join('\n') : String(result);
    } catch (error: any) {
      outputArea.textContent = "Error executing JavaScript: " + error.message;
    }
  }

  runPython(code: string) {
    // You would need a backend API to run Python code securely
    alert("Python code execution is not supported in this environment.");
  }

  selectTheme(): void {
    const themeSelect = document.getElementById("select") as HTMLSelectElement;
    const selectedTheme = themeSelect.options[themeSelect.selectedIndex].textContent;
    if (this.editor && selectedTheme) {
      this.editor.setOption("theme", selectedTheme);
    }
  }


  undo(): void {
    this.editor.undo();
  }

  redo(): void {
    this.editor.redo();
  }

  selectLanguage(): void {
    const languageSelect = document.getElementById("language") as HTMLSelectElement;
    const selectedLanguage = languageSelect.options[languageSelect.selectedIndex].value;

    // Update the language mode in CodeMirror
    if (this.editor) {
      this.editor.setOption("mode", selectedLanguage);

      // Set the custom code snippet based on the selected language
      const snippet = this.codeSnippets[selectedLanguage] || '';
      this.editor.getDoc().setValue(snippet);
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? "material" : "default";
    if (this.editor) {
      this.editor.setOption("theme", theme);
    }
  }

  onCodeChange(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.codeContent = textarea.value; // Update the code content
  }

  changeFontSize(increase: boolean): void {
    const currentSize = parseInt(window.getComputedStyle(this.editor.getWrapperElement()).fontSize, 10);
    const newSize = increase ? currentSize + 2 : currentSize - 2;
    this.editor.getWrapperElement().style.fontSize = `${newSize}px`;
    this.editor.refresh(); // Refresh editor to apply new font size
  }

  saveCode(): void {
    const fileName = 'my-code'; // Default file name or customize this if needed
    const blob = new Blob([this.codeContent], { type: 'text/plain;charset=utf-8' }); // Create a Blob from the code content
    saveAs(blob, `${fileName}.txt`); // Use FileSaver to save the file with the specified name
  }

  loadSavedCode(): void {
    const savedCode = localStorage.getItem('savedCode');
    if (savedCode && this.editor) {
      this.editor.setValue(savedCode);
    }
  }
}
