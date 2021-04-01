export type Comment = {
    id: string;
    createdOn: Date;
    modifiedOn?: Date;
    message: string;
    description?: string;
};