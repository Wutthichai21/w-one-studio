import { useEffect, useState } from "react";
import { useRouter } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FileUploadComponent from "@/components/FileUploadComponent";
import { useNotification } from "@/contexts/NotificationContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface FileData {
  id: number;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useRouter() as any;
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/trpc/auth.me");
        const data = await response.json();

        if (!data.result?.data) {
          setLocation("/");
          return;
        }

        setUser(data.result.data);
        await loadFiles();
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setLocation("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setLocation]);

  const loadFiles = async () => {
    try {
      const response = await fetch("/api/trpc/files.list");
      const data = await response.json();

      if (data.result?.data) {
        setFiles(data.result.data);
      }
    } catch (error) {
      console.error("Failed to load files:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/trpc/auth.logout", { method: "POST" });
      showNotification("ออกจากระบบสำเร็จ", "success");
      setLocation("/");
    } catch (error) {
      showNotification("ออกจากระบบล้มเหลว", "error");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const chartData = [
    { name: "ไฟล์ทั้งหมด", value: files.length },
    { name: "ขนาดรวม", value: Math.round(files.reduce((sum, f) => sum + f.fileSize, 0) / 1024 / 1024) },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-50 bg-background">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">ยินดีต้อนรับ, {user.name || user.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            ออกจากระบบ
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Upload Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>อัปโหลดไฟล์</CardTitle>
              <CardDescription>ลากไฟล์มาวางหรือคลิกเพื่อเลือก</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadComponent onUploadSuccess={loadFiles} />
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">ไฟล์ทั้งหมด</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{files.length}</div>
              <p className="text-xs text-muted-foreground mt-2">ไฟล์ที่อัปโหลด</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">ขนาดรวม</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {formatFileSize(files.reduce((sum, f) => sum + f.fileSize, 0))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">พื้นที่ที่ใช้</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics */}
        {files.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>สถิติ</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#1E3A8A" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Files List */}
        <Card>
          <CardHeader>
            <CardTitle>ไฟล์ของฉัน</CardTitle>
            <CardDescription>รายการไฟล์ที่อัปโหลด</CardDescription>
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">ยังไม่มีไฟล์ที่อัปโหลด</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">ชื่อไฟล์</th>
                      <th className="text-left py-3 px-4 font-medium">ขนาด</th>
                      <th className="text-left py-3 px-4 font-medium">วันที่อัปโหลด</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr key={file.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4">{file.fileName}</td>
                        <td className="py-3 px-4">{formatFileSize(file.fileSize)}</td>
                        <td className="py-3 px-4">{formatDate(file.uploadedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
