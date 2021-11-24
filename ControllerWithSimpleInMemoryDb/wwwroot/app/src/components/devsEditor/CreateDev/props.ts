export interface CreateDevProps {
    nextId: number;
    nextIdIsKnown: boolean;
    save(firstName: string, lastName: string, onSuccessfulSave: () => void): void;
}
