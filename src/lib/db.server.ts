// Simple in-memory mock database

export interface User {
	id: number;
	username: string;
	password?: string;
	name: string;
}

export interface Comment {
	id: number;
	author: string;
	text: string;
	timestamp: string;
}

export const users: User[] = [
	{ id: 1, username: 'admin', password: 'password', name: 'Administrator' },
	{ id: 2, username: 'test', password: 'testuser', name: 'Test User' }
];

// Pre-populate with some innocent comments
export const comments: Comment[] = [
	{
		id: 1,
		author: 'admin',
		text: 'Welcome to our secure platform!',
		timestamp: new Date(Date.now() - 86400000).toISOString()
	},
	{
		id: 2,
		author: 'test',
		text: 'Hello everyone!',
		timestamp: new Date(Date.now() - 3600000).toISOString()
	}
];

export function getUser(username: string, password?: string): User | undefined {
	if (password) {
		return users.find((u) => u.username === username && u.password === password);
	}
	return users.find((u) => u.username === username);
}

export function getUserByUsername(username: string): User | undefined {
	return users.find((u) => u.username === username);
}

export function getComments(): Comment[] {
	return [...comments].reverse(); // newest first
}

export function addComment(author: string, text: string): Comment {
	const newComment: Comment = {
		id: comments.length + 1,
		author,
		text,
		timestamp: new Date().toISOString()
	};
	comments.push(newComment);
	return newComment;
}
