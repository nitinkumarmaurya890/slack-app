import {atom, useAtom} from "jotai";

const modalState = atom(false);

export const useCreationWorkspaceModal = ()=> {
    return useAtom(modalState);
}