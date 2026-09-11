/**
 * CodePaint Studio — 全站内容单一数据源。
 */

/* ---------------- Projects ---------------- */

export type Project = {
  id: string;
  name: string;
  nameZh?: string;
  status: string[];
  desc: string;
  features: string[];
  live?: string;
  liveLabel?: string;
  repo?: string;
  internal?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "album",
    name: "ALBUM",
    status: ["生产环境运行中", "v1.4.2 已发布"],
    desc: "面向团队协作的企业级在线相册系统，支持图库共享、无损图像传输、EXIF 元数据解析与分级权限控制。",
    features: ["无损图像传输", "EXIF 元数据解析", "分级权限控制"],
    live: "https://album.hub.feashow.cn",
    liveLabel: "在线体验",
    repo: "https://github.com/codepaintstudio/album",
  },
  {
    id: "vuedir",
    name: "VUEDIR",
    status: ["开源维护中", "开箱即用"],
    desc: "面向 Vue 3 的高复用自定义指令集合，注重类型安全、组件内聚与低接入成本，已应用于团队多个项目。",
    features: ["v-click-outside", "v-debounce", "v-copy", "v-focus"],
    live: "https://vuedir.feashow.cn/",
    liveLabel: "在线技术文档",
    repo: "https://github.com/codepaintstudio/vuedir",
  },
  {
    id: "cp-email",
    name: "CP-EMAIL",
    status: ["统一调用接口", "模板调度机制"],
    desc: "轻量级邮件微服务组件，提供统一调用接口、动态模板调度与参数校验，服务于工作室多个业务系统。",
    features: ["统一服务调用", "动态模板调度", "参数校验"],
    live: "http://cpemail.hub.feashow.cn/",
    liveLabel: "在线体验",
    repo: "https://github.com/codepaintstudio/cp-email",
  },
  {
    id: "ncda",
    name: "全国高校数字艺术设计大赛\n（优秀作品）",
    status: ["NCDA 获奖作品", "在线交互体验"],
    desc: "全国高校数字艺术设计大赛（NCDA）国家级获奖作品，探索数字艺术创意与现代 Web 交互工程的深度结合，提供沉浸式互动体验。",
    features: ["数字艺术设计", "三维动效交互", "现代前端工程"],
    live: "https://static.pawmark.net/index.html",
    liveLabel: "在线体验",
  },
];

/* ---------------- Mentors ---------------- */

export type Mentor = {
  id: string;
  name: string;
  surname: string;
  focus: string;
  pedigree: string;
  title: string;
  domain: string;
  tags: string[];
  bio: string;
};

export const MENTORS: Mentor[] = [
  {
    id: "mentor-huang",
    name: "黄媛媛",
    surname: "黄",
    focus: "企业级高可用系统架构 · 全栈工程化研发与规范",
    pedigree: "电子科技大学硕士 · 数字媒体技术系主任 · 前中兴通讯系统工程师",
    title: "副教授 · 高级工程师",
    domain: "工程架构 / 全栈开发",
    tags: ["前中兴通讯系统架构", "2G-5G 网管平台核心研发", "系主任 · 校级学术委员"],
    bio: "曾任职于中兴通讯，主导 2G-5G 电信级网管平台研发，具备企业级复杂系统架构落地与团队管理经验。",
  },
  {
    id: "mentor-wang",
    name: "王风硕",
    surname: "王",
    focus: "高并发服务治理 · 微服务架构与高可用运维",
    pedigree: "西南交通大学硕士 · 前华为终端 / 华为技术 7 年 · 骨干教师",
    title: "工程师 · 双师型教师",
    domain: "系统架构 / 高并发服务",
    tags: ["华为研发 / 运维 / 项目经理", "大规模话务系统", "政务监管平台"],
    bio: "历任华为研发、运维、项目经理与系统架构师，参与社保话务系统、政务监察平台及通信网络建设等工程。",
  },
  {
    id: "mentor-guo",
    name: "郭昱君",
    surname: "郭",
    focus: "学科竞赛指导 · 产学研成果转化",
    pedigree: "莫纳什大学硕士 · 马来西亚国立大学博士在读 · 学院学科竞赛负责人",
    title: "讲师 · 竞赛指导教师",
    domain: "学科竞赛 / 产学研",
    tags: ["学科竞赛指导", "CIMA 管理会计认证", "产学研项目"],
    bio: "负责学院学科竞赛组织与人才培养，指导学生获得多项国家级、省部级奖项，推动创意与工程成果转化。",
  },
  {
    id: "mentor-zhang",
    name: "张蕙",
    surname: "张",
    focus: "设计工程化 · Design System · 交互体验设计",
    pedigree: "电子科技大学硕士 · 企业交互设计履历 · 川大锦城“夫子育人”奖",
    title: "讲师 · UI / 人机交互",
    domain: "人机交互 / 体验设计",
    tags: ["企业 Design System", "移动端交互", "学科竞赛指导"],
    bio: "具有企业产品设计与交互开发经验，指导学生在设计与软件类竞赛中获得多项奖项。",
  },
  {
    id: "mentor-chu",
    name: "褚晓川",
    surname: "褚",
    focus: "数字媒体产研 · 赛事标准与答辩评审",
    pedigree: "四川省高校美术家协会会员 · “金犊奖”评审专家 · 全国毕业设计评审专家",
    title: "讲师 · 艺术评审专家",
    domain: "数字媒体 / 评审指导",
    tags: ["金犊奖评委", "省级科研项目主持", "四川省高校美协会员"],
    bio: "主持多项省级科研项目，研究数字媒体技术与视觉传达，熟悉从技术构思到赛事评审的全过程。",
  },
];

/* ---------------- Outcome ---------------- */

export const METRICS = [
  { value: 7, suffix: "人", label: "企业正式录用", desc: "含腾讯总部、微信事业群、美团、七牛云等" },
  { value: 4, suffix: "项", label: "国家级学科竞赛奖项", desc: "蓝桥杯全国总决赛 / 全国高校数字艺术设计大赛（NCDA）" },
  { value: 17, suffix: "项", label: "省部级学科竞赛奖项", desc: "涵盖软件工程、Web 全栈开发与人机交互设计" },
];

export type Placement = { name: string; meta: string };

export const PLACEMENTS: Placement[] = [
  { name: "腾讯", meta: "成都 · 2026 届" },
  { name: "腾讯 · 微信事业群", meta: "广州 · 2026 届" },
  { name: "七牛云", meta: "2026 届" },
  { name: "腾讯云智", meta: "武汉 · 已录用" },
  { name: "美团", meta: "北京 · 已录用" },
];

export const AWARDS = [
  { name: "蓝桥杯全国软件和信息技术专业人才大赛", national: 2, provincial: 9 },
  { name: "全国高校数字艺术设计大赛（NCDA）", national: 2, provincial: 8 },
];

/* ---------------- How we work ---------------- */

export const WORK_STAGES = [
  {
    title: "工程入门",
    desc: "熟悉工程工具链与团队规范，完成基础环境配置与入门实践。",
  },
  {
    title: "协作开发",
    desc: "从处理已知 Issue、编写单元测试与完善文档入手，熟悉团队协作流程；由往届成员提供一对一代码走读与日常答疑。",
  },
  {
    title: "模块负责",
    desc: "独立负责实际产品或开源项目中的完整模块，接受架构评审与任务拆解指导。",
  },
  {
    title: "项目实践",
    desc: "参与真实业务需求与工程项目，积累从需求分析到交付上线的完整经验。",
  },
];

export const DOC_CATEGORIES = [
  { name: "前端工程", desc: "React / Vue / TypeScript", count: "26 篇" },
  { name: "工程工具链", desc: "Vite / ESLint / Git 工作流", count: "18 篇" },
  { name: "部署运维", desc: "Docker / Nginx / CI-CD", count: "22 篇" },
  { name: "学科竞赛", desc: "题目解析 / 技术方案 / 复盘", count: "19 篇" },
  { name: "问题排查", desc: "移动端适配 / 异步时序 / 跨域", count: "24 篇" },
];

export const KNOWLEDGE_TOTAL = "100+";

/* ---------------- Values ---------------- */

export const VALUES = [
  {
    title: "技术深潜",
    desc: "研读技术规范与开源实现，关注工程边界与底层机制，以可验证的实践结论替代概念堆砌。",
  },
  {
    title: "开放协作",
    desc: "保持透明沟通，将架构决策、问题排查与交付经验整理为可复用的团队资产。",
  },
  {
    title: "务实交付",
    desc: "重视需求闭环、系统可靠性与长期可维护性，持续迭代可运行、可验证的工程成果。",
  },
];

/* ---------------- Join ---------------- */

export const JOIN_STEPS = [
  {
    title: "了解作品",
    desc: "查阅工作室已发布的开源项目与工程文档，了解团队技术方向与协作方式。",
    action: { label: "查看 GitHub", href: "https://github.com/codepaintstudio" },
  },
  {
    title: "提交申请",
    desc: "提交个人介绍与作品链接，工作室将安排线下或线上交流。",
    action: { label: "发送申请邮件", mailto: true },
  },
  {
    title: "进入项目",
    desc: "分配指导导师，配置开发环境与知识库权限，进入项目协作流程。",
  },
];

export const APPLY_EMAIL = "wujieruanchuang@163.com";

export function buildApplyMailto(): string {
  const subject = encodeURIComponent("【入队申请】CodePaint Studio 成员申请");
  const body = encodeURIComponent(
    "尊敬的 CodePaint Studio 团队：\n\n您好！我希望申请加入 CodePaint Studio，以下为我的基本信息：\n\n【基本信息】\n姓名：\n年级专业：\n联系电话 / 微信：\n\n【技术方向与掌握栈】\n例如：前端（React / Vue / TypeScript）/ 后端（Node.js / Go）/ UI / UX 设计\n\n【个人介绍与代表作品】\n个人优势 / 个人主页 / GitHub 链接 / 作品集：\n\n期待与团队进一步交流。",
  );
  return `mailto:${APPLY_EMAIL}?subject=${subject}&body=${body}`;
}

export function openApply() {
  window.location.href = buildApplyMailto();
}

/* ---------------- Footer links ---------------- */

export const FOOTER_LINKS = [
  { label: "GitHub 组织", href: "https://github.com/codepaintstudio" },
  { label: "Album 在线体验", href: "https://album.hub.feashow.cn" },
  { label: "vuedir 在线技术文档", href: "https://vuedir.feashow.cn" },
  { label: "NCDA 优秀作品在线体验", href: "https://static.pawmark.net/index.html" },
];

/* ---------------- Scene nav ---------------- */

export const SCENES = [
  { id: "intro", label: "首页" },
  { id: "about", label: "关于团队" },
  { id: "projects", label: "代表工程" },
  { id: "how", label: "研发体系" },
  { id: "people", label: "导师团队" },
  { id: "outcome", label: "育人成果" },
  { id: "join", label: "加入团队" },
] as const;
