import { useEffect, useState } from "react";
import API from "../lib/api";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Auctions() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_price: 10,
    bid_increment: 1,
    start_time: "",
    end_time: "",
  });

  async function load() {
    const res = await API.get("/auctions");
    setList(res.data);
  }

  async function create() {
    const s = await API.post("/auctions", form);
    if (s.data?.id) {
      setForm({
        title: "",
        description: "",
        start_price: 10,
        bid_increment: 1,
        start_time: "",
        end_time: "",
      });
      load();
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 p-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Create Auction Form */}
        <Card className="shadow-lg border border-yellow-200 bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-yellow-700">Create Auction (Sellers)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                placeholder="Auction title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                placeholder="Short description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Start Price (₹)</Label>
              <Input
                type="number"
                value={form.start_price}
                onChange={(e) => setForm({ ...form, start_price: e.target.value })}
              />
            </div>
            <div>
              <Label>Bid Increment (₹)</Label>
              <Input
                type="number"
                value={form.bid_increment}
                onChange={(e) => setForm({ ...form, bid_increment: e.target.value })}
              />
            </div>
            <div>
              <Label>Start Time</Label>
              <Input
                type="datetime-local"
                value={form.start_time}
                onChange={(e) => setForm({ ...form, start_time: e.target.value })}
              />
            </div>
            <div>
              <Label>End Time</Label>
              <Input
                type="datetime-local"
                value={form.end_time}
                onChange={(e) => setForm({ ...form, end_time: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={create}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white shadow-md"
            >
              Create Auction
            </Button>
          </CardFooter>
        </Card>

        {/* Auction List */}
        <Card className="shadow-lg border border-orange-200 bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-orange-700">Live Auctions</CardTitle>
          </CardHeader>
          <CardContent>
            {list.length === 0 ? (
              <p className="text-gray-500">No auctions available yet.</p>
            ) : (
              <ul className="space-y-3">
                {list.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center justify-between rounded-lg border p-3 shadow-sm hover:bg-orange-50 transition"
                  >
                    <div>
                      <Link
                        to={`/auctions/${a.id}`}
                        className="text-lg font-medium text-indigo-600 hover:underline"
                      >
                        {a.title}
                      </Link>
                      <p className="text-sm text-gray-500">{a.status}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">₹{a.start_price}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
