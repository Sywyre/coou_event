import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { useCam } from "@/stores";
import { useNavigate, useParams } from "react-router-dom";
import { base } from "@/utils";
import { Loader2 } from "lucide-react";
import { Toaster } from "./ui/toaster";
import { useToast } from "@/components/ui/use-toast";

const Webcamera = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { url, updateUrl, bool, updateBool } = useCam();
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const param = useParams();
  if (param.id) var paramId = param.id;

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      updateUrl(imageSrc);
      updateBool('true');
    }
  }, [webcamRef]);

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  const handleUpload = () => {
    setIsLoading(true);
    const payload = {
      is_captured: bool,
      captured_img: url?.toString(),
    };
    base(import.meta.env.VITE_AIRTABLE_TABLE).update(
      [
        {
          id: paramId,
          fields: payload,
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          //setToast("error");
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: `Try again`,
          });
          setIsLoading(false);
          setCaptureEnable(true);
          updateUrl(null);
          return;
        }
        records?.forEach(function () {
          //reset();
        });
        toast({
          title: "Congrats🎉",
          description: `Captured Successfully`,
        });
        setIsLoading(false);
        setCaptureEnable(true);
        updateUrl(null)
        setTimeout(() => navigate("/view"), 2000);
      }
    );
  };

  return (
    <div className="bg-muted">
      <div className="flex justify-center items-center py-3">
        <Toaster />
        {isCaptureEnable || (
          <Button onClick={() => setCaptureEnable(true)}>Start Camera</Button>
        )}
      </div>
      {isCaptureEnable && (
        <>
          <div className="flex justify-center items-center">
            <Webcam
              audio={false}
              width={400}
              height={300}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <div className="flex justify-center py-4 gap-4">
            <Button onClick={() => setCaptureEnable(false)}>Stop Camera</Button>
            <Button onClick={capture}>Capture</Button>
          </div>
        </>
      )}
      {url && (
        <>
          <div className="grid gap-2 justify-center">
            <h1 className="font-headingFont text-center">Preview Image</h1>
            <img src={url} className="w-[300px] " alt="Screenshot" />
          </div>
          <div className="flex gap-3 justify-center py-3">
            <Button
              onClick={() => {
                updateUrl(null);
                updateBool('false');
              }}
            >
              Delete
            </Button>
            <Button onClick={handleUpload}>
              Upload
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Webcamera;


