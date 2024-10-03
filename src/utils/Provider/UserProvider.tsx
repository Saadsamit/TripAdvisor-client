import { jwtDecode } from "jwt-decode";
import { TcurrentUser } from "@/src/types/userType";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserProviderValues {
  user: TcurrentUser | null;
  isLoading: boolean;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children, token }: { children: ReactNode, token: string | undefined }) => {
  const [user, setUser] = useState<TcurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleUser = async () => {
    let currentUser: TcurrentUser | null = null;

    if(token) {
        currentUser = jwtDecode(token as string)
    }

    setUser(currentUser);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading, token]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
