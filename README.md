# Portfolio

เว็บพอร์ตโฟลิโอสายงาน Embedded Systems — Next.js (App Router) + Tailwind CSS
สองภาษา ไทย/อังกฤษ, export เป็นไฟล์ static ล้วน, deploy ขึ้น GitHub Pages

## รันบนเครื่อง

```bash
npm install
npm run dev
```

เปิด http://localhost:3000 — จะเด้งไปที่ `/th` หรือ `/en` ตามภาษาเบราว์เซอร์

```bash
npm run build     # สร้างเว็บ static ทั้งหมดลงโฟลเดอร์ out/
npx serve out     # ลองเปิดของจริงที่จะขึ้นเว็บ
npx eslint .      # ตรวจโค้ด
```

---

## แก้เนื้อหา — แก้แค่ในโฟลเดอร์ `content/`

ทุกข้อความที่คนอ่านเห็นอยู่ในนี้ ไม่ต้องแตะโค้ดหน้าเว็บเลย
ทุกฟิลด์ข้อความต้องมีทั้ง `th` และ `en` (TypeScript จะฟ้องถ้าลืมใส่)

| ไฟล์ | เอาไว้แก้อะไร |
|---|---|
| `content/profile.ts` | ชื่อ ตำแหน่ง คำโปรย ประวัติย่อ ช่องทางติดต่อ ไฟล์ resume |
| `content/projects.ts` | **โปรเจกต์ทั้งหมด** |
| `content/skills.ts` | ทักษะและเครื่องมือ (หน้า Skills) |
| `content/resume.ts` | การศึกษา ประสบการณ์ กิจกรรม (หน้า Resume) |
| `content/certificates.ts` | ใบรับรอง |
| `content/types.ts` | โครงสร้างข้อมูล — แก้เมื่อต้องการ *เพิ่มฟิลด์ใหม่* เท่านั้น |

### เพิ่มโปรเจกต์ใหม่

1. เปิด `content/projects.ts`
2. ก๊อป object `auto-height-meter` (ตัวล่างสุด ทำไว้เป็นเทมเพลต) ไปวางในอาร์เรย์
3. เปลี่ยน `slug` ให้ไม่ซ้ำ แล้วกรอกข้อมูลให้ครบทั้งไทยและอังกฤษ
4. `npm run build`

เท่านั้น — การ์ดในหน้า Projects, ตัวกรองแท็ก, และหน้ารายละเอียดที่
`/th/projects/<slug>` กับ `/en/projects/<slug>` จะขึ้นมาเอง **ไม่ต้องแก้ไฟล์อื่นเลย**

ใส่ `featured: true` ถ้าอยากให้โผล่บนหน้าแรกด้วย

### รูปและไฟล์ PDF

วางไว้ใน `public/` แล้วอ้างอิงด้วย path ที่ขึ้นต้นด้วย `/`

- รูปโปรเจกต์ → `public/images/<slug>/...` → `cover: "/images/<slug>/cover.jpg"`
- ใบรับรอง → `public/images/certs/...`
- เรซูเม่ → `public/resume-th.pdf`, `public/resume-en.pdf`

### ข้อความ UI (เมนู ปุ่ม หัวข้อ)

อยู่ใน `lib/i18n.ts` ที่เดียว ห้ามพิมพ์ข้อความภาษาไทย/อังกฤษลงไปใน JSX ตรง ๆ

---

## ขึ้นเว็บ (GitHub Pages)

ตั้งค่าครั้งเดียว:

1. สร้าง repo ชื่อ `<username>.github.io` บน GitHub
2. แก้ค่าใน `lib/site.ts` ให้เป็น URL และ username จริง
3. push โค้ดขึ้น branch `main`
4. ที่ repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**

หลังจากนั้นทุกครั้งที่ push ขึ้น `main` ไฟล์ `.github/workflows/deploy.yml`
จะ build แล้ว deploy ให้อัตโนมัติ

> ถ้าย้ายไปใช้ repo ธรรมดา (เช่น `username.github.io/portfolio`)
> ต้องเพิ่ม `basePath` กับ `assetPrefix` ใน `next.config.ts` ด้วย

---

## ห้ามใส่ลงเว็บ

เว็บนี้เป็นสาธารณะ — **อย่า** ใส่ IP เครื่อง/วง LAN, IP ของ VPN, hostname,
ชื่อผู้ใช้ SSH, รหัสผ่าน, ชื่อผู้ใช้ MQTT หรือ API key ลงในไฟล์ `content/`
เขียนถึงสถาปัตยกรรมและเทคนิคได้เต็มที่ แต่ไม่ต้องลงค่าจริง

---

## โครงสร้างโปรเจกต์

```
app/(redirect)/        "/" — หน้าเด้งไปเลือกภาษา
app/(site)/[locale]/   หน้าเว็บจริงทั้งหมด สร้างซ้ำหนึ่งชุดต่อหนึ่งภาษา
components/layout/     Nav, Footer, LocaleSwitch, ThemeToggle
components/ui/         การ์ด ตาราง ไทม์ไลน์ ฯลฯ
content/               ★ เนื้อหาทั้งหมด
lib/                   i18n, theme, ค่าคงที่ของเว็บ
public/                รูป, PDF, .nojekyll
```

งานออกแบบหน้าตาอ่าน `DESIGN_BRIEF.md`
