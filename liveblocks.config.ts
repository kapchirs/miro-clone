// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data

import {
  createClient,
  LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

import { Layer, Color } from "@/types/canvas";

const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblocks-auth",
});

declare global {
  interface Liveblocks {
    Presence: {
      cursor: {x: number; y: number } | null,
      selection: string[];
    };

    Storage: {
      layers: LiveMap<string, LiveObject<Layer>>;
      layerIds: LiveList<string>;
    };

    UserMeta: {
      id?: string;
      info?: {
        name?: string;
        picture?: string;
        avatar?: string;
      };
    };
  }
};
