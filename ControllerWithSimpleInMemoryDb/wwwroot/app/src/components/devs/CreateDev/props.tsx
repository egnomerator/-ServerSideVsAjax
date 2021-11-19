export interface CreateDevProps {
    nextId: number;
    nextIdIsKnown: boolean;
    save(name: string, onSuccessfulSave: () => void): void;
}
