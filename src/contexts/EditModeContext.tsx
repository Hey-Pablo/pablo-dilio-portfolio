import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface EditModeContextValue {
  editMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (v: boolean) => void;
}

const EditModeContext = createContext<EditModeContextValue | null>(null);

const STORAGE_KEY = "pablo.editMode";

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const [editMode, setEditModeState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, editMode ? "1" : "0");
    } catch {
      // ignore
    }
  }, [editMode]);

  return (
    <EditModeContext.Provider
      value={{
        editMode,
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
