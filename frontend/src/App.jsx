import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "./index.css";

export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-white/20 bg-white/80 backdrop-blur-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold text-gray-900 drop-shadow-sm">
            Auction MVP
          </CardTitle>
        </CardHeader>

        <CardContent>
          <nav className="flex flex-col gap-4">
            <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
              <Link to="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md"
            >
              <Link to="/register">Register</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-gray-300 text-gray-800 hover:bg-gray-100 shadow-sm"
            >
              <Link to="/auctions">Auctions</Link>
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}
