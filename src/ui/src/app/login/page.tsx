"use client";
import { useState } from "react";
import { api } from "~/lib/api";

export default function Login() {
  const [userId, setUserId] = useState<number>(-1);

  async function hanldeLogin() {
    if (userId == -1) {
      alert("error");
      return;
    }

    await api.auth.authenticate(userId);
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="user id"
          onChange={(e) => setUserId(+e.target.value)}
        />
        <button type="submit" onClick={hanldeLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
