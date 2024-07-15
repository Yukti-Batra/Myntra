import {
  AvatarCreator,
  AvatarCreatorConfig,
  AvatarExportedEvent,
} from "@readyplayerme/react-avatar-creator";
import { Avatar } from "@readyplayerme/visage";
import { useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: false,
  language: "en",
};

const style = { width: "100%", height: "100vh", border: "none", margin: 0 };

function App() {
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    setAvatarUrl(event.data.url);
  };

  if (avatarUrl) {
    return (
      <>
        <Avatar
          modelSrc={avatarUrl}
          style={style}
          onLoaded={() => setIsLoading(false)}
        />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <button
            onClick={() => {
              setAvatarUrl(undefined);
              setIsLoading(true);
            }}
          >
            Create new avatar
          </button>
        )}
      </>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <AvatarCreator
        subdomain="demo"
        config={config}
        style={{ display: avatarUrl ? "none" : "inherit", ...style }}
        onAvatarExported={handleOnAvatarExported}
      />
    </div>
  );
}

export default App;
