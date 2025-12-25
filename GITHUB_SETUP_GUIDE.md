# คู่มือการสร้าง GitHub Account และเชื่อมต่อ Repository

## ขั้นตอนที่ 1: สร้าง GitHub Account

### 1.1 เข้าไปที่เว็บไซต์ GitHub

- ไปที่ [https://github.com](https://github.com)
- คลิกปุ่ม **"Sign up"** ที่มุมบนขวา

### 1.2 กรอกข้อมูลการสมัครสมาชิก

- **Email address**: กรอกอีเมลของคุณ
- **Password**: สร้างรหัสผ่านที่แข็งแรง (อย่างน้อย 15 ตัวอักษร หรือ 8 ตัวอักษรพร้อมตัวเลขและสัญลักษณ์)
- **Username**: เลือกชื่อ username ที่ต้องการ (เช่น `your-name` หรือ `yourname`)
- **Would you like to receive product updates and announcements via email?**: เลือก Yes หรือ No ตามต้องการ

### 1.3 ยืนยันตัวตน

- GitHub จะส่งอีเมลยืนยันไปยังอีเมลของคุณ
- เปิดอีเมล และคลิกลิงก์ยืนยัน
- ตอบคำถามเพื่อยืนยันว่าคุณไม่ใช่โปรแกรมอัตโนมัติ

### 1.4 เสร็จสิ้นการตั้งค่า

- GitHub จะพาคุณไปยังหน้า setup
- เลือก **"Free"** plan (ฟรี)
- ข้ามขั้นตอนอื่นๆ หรือตั้งค่าตามต้องการ

---

## ขั้นตอนที่ 2: สร้าง Repository ใหม่

### 2.1 ไปที่หน้าสร้าง Repository

- คลิกไอคอน **"+"** ที่มุมบนขวา
- เลือก **"New repository"**

### 2.2 กรอกข้อมูล Repository

- **Repository name**: `w-one-studio`
- **Description** (ไม่บังคับ):
  ```
  W-ONE STUDIO - Design the Game, Don't Just Play It
  A strategic consulting studio for freelancers and modern entrepreneurs
  ```
- **Public/Private**: เลือก **"Public"**
- **Initialize this repository with:**
  - ✓ Add a README file
  - ✓ Add .gitignore (เลือก Node)
  - ✓ Choose a license (ไม่บังคับ - เลือก MIT License หากต้องการ)

### 2.3 สร้าง Repository

- คลิกปุ่ม **"Create repository"**

---

## ขั้นตอนที่ 3: เชื่อมต่อโค้ดท้องถิ่นกับ GitHub

### 3.1 คัดลอก Repository URL

- ไปที่ repository ที่คุณสร้างใหม่
- คลิกปุ่ม **"Code"** (สีเขียว)
- คัดลอก URL (HTTPS หรือ SSH)
  - **HTTPS**: `https://github.com/your-username/w-one-studio.git`
  - **SSH**: `git@github.com:your-username/w-one-studio.git`

### 3.2 ตั้งค่า Git ในเครื่องของคุณ (ถ้ายังไม่ได้ตั้ง)

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### 3.3 เชื่อมต่อ Repository ท้องถิ่น

ไปที่โฟลเดอร์โปรเจกต์ของคุณ:

```bash
cd /home/ubuntu/w-one-studio
```

ตั้งค่า remote origin:

```bash
git remote add origin https://github.com/your-username/w-one-studio.git
```

### 3.4 ส่งโค้ดไปยัง GitHub

```bash
git branch -M main
git push -u origin main
```

หากขึ้นข้อความขอ authentication:

- **HTTPS**: ใช้ GitHub username และ Personal Access Token (ดูขั้นตอนด้านล่าง)
- **SSH**: ตั้งค่า SSH key (ดูขั้นตอนด้านล่าง)

---

## ขั้นตอนที่ 4: ตั้งค่า Authentication (เลือกหนึ่งในสองวิธี)

### วิธีที่ 1: ใช้ Personal Access Token (ง่ายกว่า)

#### 4.1 สร้าง Personal Access Token

- ไปที่ GitHub Settings: [https://github.com/settings/tokens](https://github.com/settings/tokens)
- คลิก **"Generate new token"** → **"Generate new token (classic)"**
- กรอกข้อมูล:
  - **Note**: `w-one-studio-push` (ชื่อสำหรับจำ)
  - **Expiration**: เลือก **"90 days"** หรือ **"No expiration"**
  - **Select scopes**: เลือก:
    - ✓ `repo` (Full control of private repositories)
    - ✓ `workflow` (Update GitHub Action workflows)

#### 4.2 คัดลอก Token

- คลิก **"Generate token"**
- **คัดลอก token ทันที** (จะไม่สามารถเห็นอีกครั้ง)

#### 4.3 ใช้ Token ในการ Push

เมื่อ Git ขอ password ให้ใช้:

- **Username**: GitHub username ของคุณ
- **Password**: Personal Access Token ที่คัดลอกมา

### วิธีที่ 2: ใช้ SSH Key (ปลอดภัยกว่า)

#### 4.1 สร้าง SSH Key

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

- กด Enter สำหรับตำแหน่ง default
- กด Enter สำหรับ passphrase (ไม่บังคับ)

#### 4.2 เพิ่ม SSH Key ไปยัง GitHub

```bash
cat ~/.ssh/id_ed25519.pub
```

- คัดลอก output ทั้งหมด

ไปที่ GitHub Settings: [https://github.com/settings/keys](https://github.com/settings/keys)

- คลิก **"New SSH key"**
- **Title**: `w-one-studio-key`
- **Key**: วาง SSH key ที่คัดลอกมา
- คลิก **"Add SSH key"**

#### 4.3 ทดสอบ SSH Connection

```bash
ssh -T git@github.com
```

---

## ขั้นตอนที่ 5: เชื่อมต่อ GitHub Actions สำหรับ CI/CD

หลังจากที่คุณส่งโค้ดไปยัง GitHub แล้ว ให้แจ้งให้ผมทราบ แล้วผมจะช่วยสร้าง GitHub Actions workflow สำหรับ CI/CD ให้คุณครับ

### สิ่งที่ GitHub Actions จะทำ:

- ✓ ตรวจสอบโค้ด (Linting)
- ✓ รัน Tests
- ✓ Build โปรเจกต์
- ✓ Deploy ไปยัง production (ถ้าต้องการ)

---

## ปัญหาทั่วไป

### ปัญหา: "fatal: remote origin already exists"

**วิธีแก้:**

```bash
git remote remove origin
git remote add origin https://github.com/your-username/w-one-studio.git
```

### ปัญหา: "Permission denied (publickey)"

**วิธีแก้:** ใช้ HTTPS แทน SSH หรือตั้งค่า SSH key ใหม่

### ปัญหา: "Authentication failed"

**วิธีแก้:**

- ตรวจสอบ username และ password/token ว่าถูกต้อง
- ลองใช้ Personal Access Token แทน password

---

## ขั้นตอนถัดไป

หลังจากที่คุณ:

1. ✓ สร้าง GitHub Account
2. ✓ สร้าง Repository `w-one-studio` แบบ Public
3. ✓ เชื่อมต่อโค้ดท้องถิ่นกับ GitHub

**โปรดแจ้งให้ผมทราบ** แล้วผมจะช่วยสร้าง GitHub Actions workflow สำหรับ CI/CD ให้คุณครับ

---

## ข้อมูลเพิ่มเติม

- [GitHub Docs - Creating a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [GitHub Docs - Authenticating with the command line](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub Docs - Connecting over SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
