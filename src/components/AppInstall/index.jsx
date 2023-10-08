import { memo, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ToastConfirm from "../Toasts/ToastConfirm";

const AppInstall = () => {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    //listen for if pwa installed by user
    window.addEventListener("appinstalled", (event) => {
      successToast("Application installation is in process!");
    });

    //show propmpt to install pwa to user
    window.addEventListener("beforeinstallprompt", async (event) => {
      //event.preventDefault();
      if (event) {
        setInstallPrompt(event);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeinstallprompt", () => {
        setInstallPrompt(null);
      });
      window.removeEventListener("appinstalled", () => {
        // setPwaPrompt(null);
      });
    };
  }, []);

  useEffect(() => {
    //when event trigger to show pwa install prompt show install toast
    const tid = setTimeout(() => {
      if (installPrompt) showInstallButton();
    }, 30000);

    return () => {
      clearTimeout(tid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installPrompt]);

  //toast component for pwa install prompt
  const showInstallButton = () => {
    toast(
      ToastConfirm(
        "Install the little lemon app on your device, and order food from the app!",
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

  //take action based on user choice of pwa installation
  const installApp = async () => {
    try {
      const { outcome } = await installPrompt.prompt();
      if (outcome === "accepted") {
        successToast("App installed successfully!");
      } else if (outcome === "dismissed") {
        errorToast("Application installation canceled.");
      }
    } catch (error) {
      errorToast("Something went wrong.");
    } finally {
      setInstallPrompt(null);
    }
  };

  //show success toast
  const successToast = (msg) => {
    const tid = toast.success(msg);
    setTimeout(() => {
      toast.dismiss(tid);
    }, 2000);
  };

  //show error toast
  const errorToast = (msg) => {
    const tid = toast.error(msg);
    setTimeout(() => {
      toast.dismiss(tid);
    }, 2000);
  };
};

export default memo(AppInstall);
