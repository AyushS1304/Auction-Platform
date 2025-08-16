import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import "./index.css";

export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="w-full rounded-3xl shadow-2xl border border-purple-500/30 bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-lg p-6">
          <CardHeader className="text-center pb-8">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <CardTitle className="text-5xl font-extrabold text-purple-400 drop-shadow-lg tracking-wide">
                BidVerse
              </CardTitle>
              <p className="text-gray-300 mt-2 text-lg">
               Step into the ultimate auction universe 🚀⚡
              </p>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.nav
              className="flex flex-col gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button asChild className="w-full py-4 text-lg bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="w-full py-4 text-lg bg-pink-600 hover:bg-pink-700 text-white shadow-lg"
              >
                <Link to="/register">Register</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full py-4 text-lg border-gray-500 text-gray-200 hover:bg-gray-800 hover:text-white shadow-md"
              >
                <Link to="/auctions">Enter Auctions</Link>
              </Button>
            </motion.nav>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
