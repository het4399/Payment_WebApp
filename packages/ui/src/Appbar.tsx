import { Button } from "./button";
import { signIn, signOut } from "next-auth/react";
import { type JSX } from "react";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: typeof signIn,
    onSignout: () => void | Promise<void>;// for using routing in it
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps): JSX.Element => {
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            PayTM
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}