export class Note {
    id: string;
    title: string;
    description: string;
    author: string; // Logged-in user
    createdAt: string; // Formatted timestamp for when the note was created
    updatedAt: string; // Formatted timestamp for when the note was last updated
    isPremium: boolean; // Premium feature flag

    constructor(title: string, description: string, author: string) {
        this.id = ''; // Will be assigned later
        this.title = title;
        this.description = description;
        this.author = author;
        this.createdAt = new Date().toLocaleString(); // Set current date and time
        this.updatedAt = new Date().toLocaleString(); // Set current date and time
        this.isPremium = false; // Default to false
    }
}
