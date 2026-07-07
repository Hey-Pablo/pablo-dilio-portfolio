import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface EditModeContextValue {
  editMode: boolean;
  canEdit: boolean;
  toggleEditMode: () => void;
  setEditMode: (v: boolean) => void;
}

const EditModeContext = createContext<EditModeContextValue | null>(null);
const KEY = "portfolio.editMode";

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAuth();
  const [editMode, setEditModeState] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      setEditModeState(localStorage.getItem(KEY) === "1");
    } else {
      setEditModeState(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) localStorage.setItem(KEY, editMode ? "1" : "0");
  }, [editMode, isAdmin]);

  return (
    <EditModeContext.Provider
      value={{
        editMode: editMode && isAdmin,
        canEdit: isAdmin,
        toggleEditMode: () => setEditModeState((v) => !v),
        setEditMode: setEditModeState,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used inside EditModeProvider");
  return ctx;
};
