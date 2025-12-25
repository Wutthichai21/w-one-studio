import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, Trash2, Loader2 } from "lucide-react";
import { useNotification } from "@/contexts/NotificationContext";

interface UploadedFile {
  id: number;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storageUrl: string;
  uploadedAt: Date;
}

export default function FileUploadComponent() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { showNotification } = useNotification();

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsLoading(true);
    try {
      const file = selectedFiles[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const base64Data = (e.target?.result as string).split(",")[1];

          // Call API to upload file
          const response = await fetch("/api/files.upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              fileData: base64Data,
              mimeType: file.type,
              fileSize: file.size,
            }),
          });

          if (!response.ok) {
            throw new Error("Upload failed");
          }

          const result = await response.json();
          showNotification(
            `ไฟล์ ${file.name} อัปโหลดสำเร็จ`,
            "success"
          );

          // Refresh file list
          await loadFiles();
        } catch (error) {
          showNotification(
            "การอัปโหลดไฟล์ล้มเหลว",
            "error"
          );
        }
      };

      reader.readAsDataURL(file);
    } finally {
      setIsLoading(false);
    }
  };

  const loadFiles = async () => {
    try {
      const response = await fetch("/api/files.list");
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (error) {
      console.error("Failed to load files:", error);
    }
  };

  const handleDelete = async (fileId: number) => {
    try {
      const response = await fetch("/api/files.delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId }),
      });

      if (response.ok) {
        showNotification(
          "ไฟล์ถูกลบเรียบร้อยแล้ว",
          "success"
        );
        await loadFiles();
      }
    } catch (error) {
      showNotification(
        "การลบไฟล์ล้มเหลว",
        "error"
      );
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileSelect(e.dataTransfer.files);
        }}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">ลากไฟล์มาที่นี่</h3>
        <p className="text-sm text-muted-foreground mb-4">
          หรือคลิกเพื่อเลือกไฟล์
        </p>
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={isLoading}
        />
        <Button
          asChild
          variant="outline"
          disabled={isLoading}
        >
          <label htmlFor="file-input" className="cursor-pointer">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                กำลังอัปโหลด...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                เลือกไฟล์
              </>
            )}
          </label>
        </Button>
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">ไฟล์ของคุณ</h3>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <File className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{file.fileName}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.fileSize)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={file.storageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    ดาวน์โหลด
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
