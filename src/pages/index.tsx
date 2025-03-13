import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">What do you want to do?</h1>
            <Link href="/help-me-decide" className="px-6 py-3 bg-green-500 text-white rounded-md m-2">Help Me Decide</Link>
            <Link href="/recipes" className="px-6 py-3 bg-blue-500 text-white rounded-md m-2">All Recipes</Link>
            <Link href="/options" className="px-6 py-3 bg-gray-500 text-white rounded-md m-2">Options</Link>
        </div>
    );
}
