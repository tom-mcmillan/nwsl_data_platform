"use client";

import React from "react";

export default function WebSearchSettings() {

  return (
    <div>
      {/* Location fields commented out - not needed for NWSL data platform */}
      {/* <div className="flex items-center justify-between">
        <div className="text-zinc-600 text-sm">User&apos;s location</div>
        <div
          className="text-zinc-400 text-sm px-1 transition-colors hover:text-zinc-600 cursor-pointer"
          onClick={handleClear}
        >
          Clear
        </div>
      </div>
      <div className="mt-3 space-y-3 text-zinc-400">
        <div className="flex items-center gap-2">
          <label htmlFor="country" className="text-sm w-20">
            Country
          </label>
          <CountrySelector
            value={webSearchConfig.user_location?.country ?? ""}
            onChange={(value) => handleLocationChange("country", value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="region" className="text-sm w-20">
            Region
          </label>
          <Input
            id="region"
            type="text"
            placeholder="Region"
            className="bg-white border text-sm flex-1 text-zinc-900 placeholder:text-zinc-400"
            value={webSearchConfig.user_location?.region ?? ""}
            onChange={(e) => handleLocationChange("region", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="city" className="text-sm w-20">
            City
          </label>
          <Input
            id="city"
            type="text"
            placeholder="City"
            className="bg-white border text-sm flex-1 text-zinc-900 placeholder:text-zinc-400"
            value={webSearchConfig.user_location?.city ?? ""}
            onChange={(e) => handleLocationChange("city", e.target.value)}
          />
        </div>
      </div> */}
      <div className="text-zinc-600 text-sm">Web search enabled with default settings</div>
    </div>
  );
}
