import axios from "axios";
import Link from "next/link";
export default function Header({ user }) {



    const handleLogout = async () => {
        let logout = await axios.post('/api/check-user', { action: "logout" })
        console.log("Logiut", logout);
        if (logout.data.status) {
            window.location.href = "/"

        }

    }

    return (
        <div className="flex bg-orange-500 p-5">
            <Link href="/">
                <h2 className="font-extrabold text-3xl ml-5">Blog</h2>
            </Link>
            <div className="flex items-end ml-auto">
                <Link href="/my-blogs">
                    <button className="border rounded-md border-white px-3 py-1 hover:bg-orange-600">My Blogs</button>
                </Link>
                {user && user.Name ? (
                    <div className="flex font-bold border ml-2 rounded-md border-white px-3 py-1 hover:bg-orange-600">
                        <p>{user.Name} /</p>
                        <p onClick={handleLogout} className="ml-1 cursor-pointer hover:text-red-700 hover:bg-white px-2 rounded rounded-md"> Logout</p>
                    </div>
                ) : (
                    <>

                        <Link href="/auth/login">
                            <button className="border rounded-md border-white px-3 py-1 ml-3 hover:bg-orange-600">Login</button>
                        </Link>
                        <Link href="/auth/register">
                            <button className="border rounded-md border-white px-3 py-1 ml-2 hover:bg-orange-600">Signup</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

