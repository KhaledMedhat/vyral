"use client";

import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { createCroppedImage } from "~/lib/utils";

interface ImageCropperProps {
  imageUrl: string;
  onApply: (croppedFile: File) => void;
  onCancel: () => void;
  aspect?: number;
  cropShape?: "rect" | "round";
  title?: string;
}

export function ImageCropper({ imageUrl, onApply, onCancel, aspect = 1, cropShape = "round", title = "Crop Image" }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  const handleApply = async () => {
    if (croppedAreaPixels) {
      const croppedFile = await createCroppedImage(imageUrl, croppedAreaPixels, rotation);
      onApply(croppedFile);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <VisuallyHidden.Root>
          <DialogDescription></DialogDescription>
        </VisuallyHidden.Root>
      </DialogHeader>
      <CropperContent
        imageUrl={imageUrl}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={aspect}
        cropShape={cropShape}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
        onCropComplete={onCropComplete}
        onReset={handleReset}
        onCancel={onCancel}
        onApply={handleApply}
      />
    </>
  );
}

// Inline version without Dialog header (for use within pages)
export function ImageCropperInline({ imageUrl, onApply, onCancel, aspect = 1, cropShape = "round", title = "Crop Image" }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  const handleApply = async () => {
    if (croppedAreaPixels) {
      const croppedFile = await createCroppedImage(imageUrl, croppedAreaPixels, rotation);
      onApply(croppedFile);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">{title}</h3>
      <CropperContent
        imageUrl={imageUrl}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={aspect}
        cropShape={cropShape}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
        onCropComplete={onCropComplete}
        onReset={handleReset}
        onCancel={onCancel}
        onApply={handleApply}
      />
    </div>
  );
}

// Shared cropper content component
interface CropperContentProps {
  imageUrl: string;
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  aspect: number;
  cropShape: "rect" | "round";
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onRotationChange: (rotation: number) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  onReset: () => void;
  onCancel: () => void;
  onApply: () => void;
}

function CropperContent({
  imageUrl,
  crop,
  zoom,
  rotation,
  aspect,
  cropShape,
  onCropChange,
  onZoomChange,
  onRotationChange,
  onCropComplete,
  onReset,
  onCancel,
  onApply,
}: CropperContentProps) {
  return (
    <>
      <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          cropShape={cropShape}
          showGrid={false}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onRotationChange={onRotationChange}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="w-12">Zoom:</span>
          <Slider value={[zoom]} min={1} max={3} step={0.1} onValueChange={(values) => onZoomChange(values[0])} className="w-24" />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-12">Rotate:</span>
          <Slider value={[rotation]} min={0} max={360} step={1} onValueChange={(values) => onRotationChange(values[0])} className="w-24" />
          <span className="w-10 text-right">{rotation}°</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 flex-1">
        <Button type="button" variant="link" onClick={onReset}>
          Reset
        </Button>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" className="flex-1 h-11" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" variant="default" className="flex-1 h-11" onClick={onApply}>
            Apply
          </Button>
        </div>
      </div>
    </>
  );
}
