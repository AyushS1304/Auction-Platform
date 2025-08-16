import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import API from "../lib/api";
import { io } from "socket.io-client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AuctionDetail() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [current, setCurrent] = useState(null);
  const [myBid, setMyBid] = useState("");
  const socket = useMemo(() => io(import.meta.env.VITE_API_BASE), []);

  async function load() {
    const res = await API.get(`/auctions/${id}`);
    setAuction(res.data.auction);
    setCurrent(res.data.current);
  }

  async function placeBid() {
    try {
      await API.post("/bids", { auction_id: id, amount: parseFloat(myBid) });
      setMyBid("");
    } catch (e) {
      alert(e.response?.data?.error || e.message);
    }
  }

  useEffect(() => {
    load();
    socket.emit("join_auction", id);
    socket.on("new_bid", ({ auction_id, amount }) => {
      if (auction_id === id) setCurrent(amount);
    });
    return () => {
      socket.emit("leave_auction", id);
      socket.off("new_bid");
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [id]);

  if (!auction)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading auction details...</p>
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <Card className="w-full max-w-lg rounded-2xl shadow-xl border border-indigo-200 bg-white/90 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-indigo-700">
            {auction.title}
          </CardTitle>
          <p className="text-gray-600 text-sm">{auction.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Auction Status */}
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Status:</span>
            <Badge
              variant={
                auction.status === "live"
                  ? "default"
                  : auction.status === "upcoming"
                  ? "secondary"
                  : "destructive"
              }
              className="capitalize"
            >
              {auction.status}
            </Badge>
          </div>

          {/* Current Bid */}
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-gray-800">Current Bid:</span>
            <span className="font-bold text-indigo-700 text-xl">
              ₹{current || auction.start_price}
            </span>
          </div>

          {/* Place a Bid */}
          <div>
            <label className="text-sm font-medium text-gray-700">Your Bid</label>
            <div className="flex gap-2 mt-1">
              <Input
                type="number"
                placeholder="Enter amount"
                value={myBid}
                onChange={(e) => setMyBid(e.target.value)}
              />
              <Button
                onClick={placeBid}
                disabled={!myBid}
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              >
                Place Bid
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="text-center text-sm text-gray-500">
          Auction ends:{" "}
          <span className="font-medium text-gray-700">
            {new Date(auction.end_time).toLocaleString()}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
