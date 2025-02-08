/** Type of displaying modal */
export enum ModalType {
    /** Display some textual information */
    Info = "info",

    /** Display some form to fill */
    Form = "form",

    /** Display modal with confirm message and 2 optional buttons */
    Confirm = "confirm",

    /** Custom modal, used via modal key */
    Custom = "custom",
}
