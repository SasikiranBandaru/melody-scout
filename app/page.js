"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import qs from "qs";
import { searchTracks } from "./utils/spotifyapi";
import { useSearchParams } from "next/navigation";
import spotifyConfig from "./utils/spotify";

export default function Home() {
  const [authToken, setAuthToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(null); // State for the code

  const params = useSearchParams();

  const fetchAccessToken = async (code) => {
    try {
      const response = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  useEffect(() => {
    const fetchedCode = params.get("code");
    if (fetchedCode) {
      setCode(fetchedCode);
    }
  }, [params]);

  useEffect(() => {
    if (code && !authToken) {
      const fetch = async () => {
        const token = await fetchAccessToken(code); // Use fetchAccessToken here
        setAuthToken(token);
        if (searchTerm) {
          const tracks = await searchTracks(token, searchTerm);
          setRecommendations(tracks);
        }
      };
      fetch();
    }
  }, [code, authToken, searchTerm]);
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!authToken) {
      console.log("No access token available");
      setIsLoading(false);
      return;
    }

    try {
      const tracks = await searchTracks(authToken, searchTerm);
      setRecommendations(tracks);
    } catch (error) {
      console.error("Error searching tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUrl =
    "https://accounts.spotify.com/authorize?" +
    qs.stringify({
      response_type: "code",
      client_id: spotifyConfig.clientId,
      scope: "user-read-private user-read-email",
      redirect_uri: spotifyConfig.redirectUri,
      state: "12321",
    });

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      {/* Search Bar */}
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSearch} className="flex w-full max-w-xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for tracks"
            className="flex-1 p-2 border-2 border-r-0 border-green-500 focus:outline-none bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 border-2 border-green-500 hover:bg-green-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
      {/* Recommendations Container */}
      <div className="flex flex-wrap justify-center gap-4 m-4">
        {recommendations.map((track) => (
          <div key={track.id} className="song-card max-w-sm bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="font-bold text-xl mb-2">{track.name}</h3>
              <p className="text-gray-400 text-base">
                Artist: {track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">Welcome to MelodyScout</h1>
        <p className="text-xl mt-2">Discover and enjoy personalized music recommendations.</p>
        {/* Logout Button */}
      </main>
      <Footer />
    </div>
  );
}
