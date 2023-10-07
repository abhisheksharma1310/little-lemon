import React, { memo, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ToastConfirm from "../Toasts/ToastConfirm";

const AppInstall = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [pwaPrompt, setPwaPrompt] = useState(null);

  const checkPWAINstall = async () => {
    const relatedApps = await navigator.getInstalledRelatedApps();
    relatedApps.forEach((app) => {
      console.log(app.id, app.platform, app.url);
    });
    return relatedApps.toString();
  };

  checkPWAINstall()
    .then((value) => console.log(value))
    .catch((err) => console.log(err));

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", () => {
      let displayMode = "browser tab";
      if (window.matchMedia("(display-mode: fullscreen)").matches) {
        displayMode = "fullscreen";
        console.log("DISPLAY_MODE:", displayMode);
        setPwaPrompt(true);
      } else {
        console.log("Please install the PWA first.");
      }
    });

    window.addEventListener("appinstalled", (event) => {
      setPwaPrompt(true);
      console.log("openPWA", event);
    });

    window.addEventListener("beforeinstallprompt", async (event) => {
      //event.preventDefault();
      if (event) {
        setInstallPrompt(event);
      }
    });

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("beforeinstallprompt", () => {
        setInstallPrompt(null);
      });
      window.removeEventListener("appinstalled", () => {
        setPwaPrompt(null);
      });
    };
  }, []);

  useEffect(() => {
    const tid = setTimeout(() => {
      if (installPrompt) showInstallButton();
    }, 60000);

    return () => {
      clearTimeout(tid);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installPrompt]);

  useEffect(() => {
    const tid = setTimeout(() => {
      if (pwaPrompt) openPWA();
    }, 5000);

    return () => {
      clearTimeout(tid);
    };
  }, [pwaPrompt]);

  const showInstallButton = () => {
    toast(
      ToastConfirm(
        "Install this app in your device, and launch it any time!",
        "",
        "Click on Yes for install and click on No to cancel.",
        () => {
          console.log("");
        },
        () => {
          setTimeout(() => installApp(), 500);
        }
      ),
      {
        duration: 60000,
      }
    );
  };

  const installApp = () => {
    toast.promise(installPrompt.prompt(), {
      loading: "Installing...",
      success: (data) =>
        data === "accepted" ? appInstalled : appInstallCancel,
      error: (err) => appInstallFail,
    });
  };

  const appInstalled = () => {
    const tid = toast.success("Application installed successfully!");
    setTimeout(() => {
      toast.dismiss(tid);
    }, 2000);
  };

  const appInstallCancel = () => {
    const tid = toast.error("Application installation fail.");
    setTimeout(() => {
      toast.dismiss(tid);
    }, 2000);
  };

  const appInstallFail = () => {
    const tid = toast.error("Something went wrong.");
    setTimeout(() => {
      toast.dismiss(tid);
    }, 2000);
  };

  const openPWA = () => {
    toast((t) => (
      <div>
        <div>
          <p>
            You have allready installed this app, click on Yes to open the app!
          </p>
        </div>
        <div className="alert">
          <button
            className="btn-primary"
            onClick={() => {
              toast.dismiss(t.id);
            }}
          >
            No
          </button>
          <a
            href="https://main--adorable-salmiakki-6c71a9.netlify.app"
            target="_blank"
            className="btn-primary"
            onClick={() => {
              toast.dismiss(t.id);
            }}
            rel="noreferrer"
          >
            Yes
          </a>
        </div>
      </div>
    ));
  };
};

export default memo(AppInstall);
