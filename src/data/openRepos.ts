export type OpenRepoStatus = "LIVE" | "DEMO" | "STARTER" | "TUTORIAL";

export type OpenRepo = {
  title: string;
  description: string;
  descriptionZh?: string;
  descriptionEn?: string;
  featuresZh?: string;
  featuresEn?: string;
  imageSrc: string;
  tags: string[];
  githubRepo: string;
  status?: OpenRepoStatus;
  starCount?: number;
};

// Curated display order. Add future repos at the top so City Zero's limited preview
// remains current while the archive keeps every entry.
export const OPEN_REPOS: OpenRepo[] = [
  {
    title: "Peggy MTS Token Launch",
    featuresZh: "包含 ERC20 部署与验证、Peggy 桥接检查、Injective Native 到 EVM MTS 表示的创建流程，以及元数据配置说明。使用前需按 README 核对源链、网络与合约配置；不是任意 EVM 网络的通用桥。",
    featuresEn: "Covers ERC20 deployment and verification, Peggy bridge checks, creation of an EVM MTS representation, and metadata configuration. Check the source chain, network, and contracts in the README before use; this is not a universal bridge for arbitrary EVM networks.",
    description: "A developer workflow for bridging an Ethereum ERC20 through Peggy to Injective Native and creating its EVM MTS representation.",
    descriptionZh: "将配置好的 Ethereum 源链 ERC20 经 Peggy 桥接至 Injective Native，再创建 EVM MTS 表示的开发流程，附脚本、模板与验证说明。",
    descriptionEn: "A developer workflow for bridging an Ethereum ERC20 through Peggy to Injective Native and creating its EVM MTS representation, with scripts, templates, and verification steps.",
    imageSrc: "/repo-covers/peggy-mts.svg",
    tags: ["Peggy", "MTS", "EVM"],
    githubRepo: "Ninja-Labs-Devs/injective-peggy-mts-token-launch",
    status: "STARTER",
  },
  {
    title: "Injective x402 Tutorial",
    featuresZh: "按环境准备、后端与前端分步讲解付费解锁内容。React 客户端与 Node.js 服务端展示 x402 请求和支付流程，适合学习钱包与 Agent 访问付费资源的实现方式。",
    featuresEn: "A step-by-step guide through setup, backend, and frontend for paid content access. The React client and Node.js server demonstrate x402 requests and payment flows for wallets and agents accessing paid resources.",
    description: "A pay-to-unlock content tutorial on Injective with a React frontend, Node.js backend, and a step-by-step x402 workflow.",
    descriptionZh: "Injective 上的 x402 付费解锁内容教程，包含 React 前端、Node.js 后端及逐步说明，适合学习钱包与 Agent 的按请求支付。",
    descriptionEn: "A pay-to-unlock content tutorial on Injective with a React frontend, Node.js backend, and step-by-step guidance for wallet and agent payments.",
    imageSrc: "/optimized/repos/x402-tutorial-1200-v1.webp",
    tags: ["x402", "React", "Node.js"],
    githubRepo: "Ninja-Labs-Devs/injective-x402-tutorial",
    status: "TUTORIAL",
  },
  {
    title: "Injective × Cointelegraph Workshop",
    featuresZh: "包括环境准备、Counter 合约、前端交互、MultiVM Token 示例及现货市场预言机脚本。按课程模块学习和复用代码；这是教学资料集合，不是面向最终用户的已上线应用。",
    featuresEn: "Includes setup, a Counter contract, frontend interactions, MultiVM Token examples, and spot-market oracle scripts. Explore the code by workshop module; this is a teaching collection rather than a live consumer application.",
    description: "Workshop examples for smart contracts, dApps, MultiVM Tokens, and spot-market oracle workflows on Injective.",
    descriptionZh: "Injective × Cointelegraph 工作坊示例，覆盖智能合约、dApp、MultiVM Token 与现货市场预言机，包含 Solidity、前端代码及部署脚本。",
    descriptionEn: "Workshop examples covering smart contracts, dApps, MultiVM Tokens, and spot-market oracles, with Solidity contracts, frontend code, and deployment scripts.",
    imageSrc: "/repo-covers/cointelegraph-workshop.svg",
    tags: ["Solidity", "MTS", "Oracles"],
    githubRepo: "Ninja-Labs-Devs/cointelegraph-workshop",
    status: "TUTORIAL",
  },
  {
    title: "N1NJ4 Website",
    description: "Production frontend for N1NJ4 and City Zero, bringing together on-chain identity, the NFT gallery, City Dispatch, events, and community project discovery.",
    descriptionZh: "N1NJ4 与 City Zero 的生产网站前端，整合链上身份、NFT Gallery、City Dispatch、活动与社区项目入口。",
    descriptionEn: "Production frontend for N1NJ4 and City Zero, bringing together on-chain identity, the NFT gallery, City Dispatch, events, and community project discovery.",
    imageSrc: "/optimized/repos/n1nj4-960-v1.webp",
    tags: ["React", "TypeScript", "Injective"],
    githubRepo: "Ninja-Labs-Devs/NinjaNFTFrontend-v2",
    status: "LIVE",
  },
  {
    title: "Star Office UI",
    description: "A pixel office for OpenClaw and AI agents, turning work states into a real-time visual space with multi-agent support and Injective EVM wallet integration.",
    descriptionZh: "面向 OpenClaw 与 AI Agent 的像素办公室，将工作状态转化为实时可视化空间，并支持 Injective EVM 钱包与多 Agent 协作。",
    descriptionEn: "A pixel office for OpenClaw and AI agents, turning work states into a real-time visual space with multi-agent support and Injective EVM wallet integration.",
    imageSrc: "/optimized/repos/star-office-960-v1.webp",
    tags: ["OpenClaw", "Python", "Injective"],
    githubRepo: "Ninja-Labs-Devs/Star-Office-UI-INJ",
    status: "DEMO",
  },
  {
    title: "USDC CCTP Demo",
    description: "A developer education dApp demonstrating native two-way USDC transfers between Injective EVM Testnet and Ethereum Sepolia using Circle CCTP.",
    descriptionZh: "面向开发者的 CCTP 教育型 dApp，演示 USDC 在 Injective EVM Testnet 与 Ethereum Sepolia 之间的双向原生跨链转移。",
    descriptionEn: "A developer education dApp demonstrating native two-way USDC transfers between Injective EVM Testnet and Ethereum Sepolia using Circle CCTP.",
    imageSrc: "/repo-covers/usdc-cctp.svg",
    tags: ["React", "CCTP", "EVM"],
    githubRepo: "Ninja-Labs-Devs/usdc-cctp-injective-demo",
    status: "DEMO",
  },
  {
    title: "React Injective Starter",
    description: "A React starter for Injective EVM dApps with wallet connectivity, USDC vault interactions, wagmi, viem, and an MCP integration path.",
    descriptionZh: "面向 Injective EVM dApp 的 React 启动模板，包含钱包连接、USDC Vault 交互、wagmi、viem 与 MCP 接入路径。",
    descriptionEn: "A React starter for Injective EVM dApps with wallet connectivity, USDC vault interactions, wagmi, viem, and an MCP integration path.",
    imageSrc: "/repo-covers/react-starter.svg",
    tags: ["React", "Wagmi", "USDC"],
    githubRepo: "Ninja-Labs-Devs/react-injective-template",
    status: "STARTER",
  },
  {
    title: "Vue Injective Starter",
    description: "A Vue 3 starter for Injective EVM dApps with wallet connection, network switching, and reusable USDC vault flows.",
    descriptionZh: "面向 Injective EVM dApp 的 Vue 3 启动模板，提供钱包连接、网络切换和可复用的 USDC Vault 交互流程。",
    descriptionEn: "A Vue 3 starter for Injective EVM dApps with wallet connection, network switching, and reusable USDC vault flows.",
    imageSrc: "/repo-covers/vue-starter.svg",
    tags: ["Vue", "Viem", "USDC"],
    githubRepo: "Ninja-Labs-Devs/vue-injective-template",
    status: "STARTER",
  },
  {
    title: "Vibe Code Starter",
    description: "An AI-assisted coding workspace configured for building Injective projects with Roo Code, project context, and reusable development instructions.",
    descriptionZh: "为 Injective 项目配置的 AI 辅助开发工作区，整合 Roo Code、项目上下文与可复用的开发指令。",
    descriptionEn: "An AI-assisted coding workspace configured for building Injective projects with Roo Code, project context, and reusable development instructions.",
    imageSrc: "/repo-covers/vibe-code.svg",
    tags: ["AI", "Roo Code", "Injective"],
    githubRepo: "Ninja-Labs-Devs/vibe-code-inj-starter",
    status: "STARTER",
  },
  {
    title: "AdventureX NFT Demo",
    description: "A cyberpunk NFT demo prepared for AdventureX, pairing an interactive minting frontend with an Injective EVM contract project.",
    descriptionZh: "为 AdventureX 制作的赛博朋克 NFT 演示项目，将交互式铸造前端与 Injective EVM 合约工程组合在一起。",
    descriptionEn: "A cyberpunk NFT demo prepared for AdventureX, pairing an interactive minting frontend with an Injective EVM contract project.",
    imageSrc: "/repo-covers/adventurex-nft.svg",
    tags: ["Next.js", "NFT", "EVM"],
    githubRepo: "Ninja-Labs-Devs/advx-nft-demo",
    status: "DEMO",
  },
  {
    title: "EVM Hello World",
    description: "A guided first project for EVM developers covering funding, compilation, testing, deployment, verification, and contract interaction on Injective.",
    descriptionZh: "面向 EVM 开发者的 Injective 入门项目，覆盖账户准备、编译、测试、部署、验证与合约交互。",
    descriptionEn: "A guided first project for EVM developers covering funding, compilation, testing, deployment, verification, and contract interaction on Injective.",
    imageSrc: "/repo-covers/evm-hello-world.svg",
    tags: ["Hardhat", "Solidity", "EVM"],
    githubRepo: "Ninja-Labs-Devs/evm-hello-world-inj",
    status: "TUTORIAL",
  },
  {
    title: "Hardhat Injective Starter",
    description: "A lean Hardhat scaffold for compiling, testing, deploying, verifying, and interacting with Solidity contracts on Injective EVM Testnet.",
    descriptionZh: "面向 Injective EVM Testnet 的轻量 Hardhat 脚手架，覆盖 Solidity 合约的编译、测试、部署、验证与交互。",
    descriptionEn: "A lean Hardhat scaffold for compiling, testing, deploying, verifying, and interacting with Solidity contracts on Injective EVM Testnet.",
    imageSrc: "/repo-covers/hardhat-starter.svg",
    tags: ["Hardhat", "Solidity", "EVM"],
    githubRepo: "Ninja-Labs-Devs/hardhat-injective-template",
    status: "STARTER",
  },
  {
    title: "Foundry Injective Starter",
    description: "A minimal Foundry workflow for building, testing, deploying, verifying, and interacting with smart contracts on Injective EVM.",
    descriptionZh: "面向 Injective EVM 的精简 Foundry 工作流，支持智能合约构建、测试、部署、验证与交互。",
    descriptionEn: "A minimal Foundry workflow for building, testing, deploying, verifying, and interacting with smart contracts on Injective EVM.",
    imageSrc: "/repo-covers/foundry-starter.svg",
    tags: ["Foundry", "Solidity", "EVM"],
    githubRepo: "Ninja-Labs-Devs/foundry-injective-template",
    status: "STARTER",
  },
];
