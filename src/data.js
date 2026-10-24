export const profile = {
  "name": "王金龙",
  "email": "Dh20020327@163.com",
  "github": "https://github.com/adventurer002",
  "blog": "https://rffj.top",
  "portrait": "/images/portrait-illustration.png",
  "intro": "你好，我是王金龙。具备丰富的电商 AI 应用落地经验，精通 Python 并深入理解异步并发。我致力于将前沿的大语言模型能力转化为真实的业务闭环，涵盖从底层多租户 MCP 微服务基建，到上层 LangGraph 复杂 Agent 编排与 RAG 架构的端到端落地。"
};

export const projects = [
  {
    "id": "mcp",
    "summary": "让多个 Agent 共享模型、知识与记忆能力。",
    "highlight": {
      "value": "共享底座",
      "label": "统一网关 · 多租户隔离"
    },
    "context": "面向多个业务 Agent 的共同需求，将模型调用、知识检索与记忆能力沉淀为独立服务，让上层应用通过 MCP 复用底层能力。",
    "detailLabels": [
      "模型调用解耦",
      "知识与记忆隔离",
      "服务接入与追踪"
    ],
    "outcomes": [
      "统一 LLM 网关与模型路由",
      "多租户知识库隔离",
      "会话与用户画像双层记忆"
    ],
    "details": [
      "统一 LLM 网关与动态模型路由，将模型调用从各业务 Agent 中解耦。",
      "多租户 RAG 隔离知识库，以项目会话与用户画像构建双层记忆。",
      "通过 MCP 暴露共享能力，由 FastAPI 网关统一处理认证与调用追踪。"
    ],
    "name": "多 Agent 共享服务集群",
    "category": "SHARED INTELLIGENCE",
    "image": "/images/project-mcp.svg",
    "tags": [
      "MCP",
      "LLM Gateway",
      "Multi-tenant RAG"
    ],
    "desc": "基于 MCP 协议的微服务底座，实现统一 LLM 网关、多租户 RAG 与双层跨界记忆架构。"
  },
  {
    "id": "voice",
    "summary": "优化检索与缓存链路，让复杂 RAG 更快响应。",
    "highlight": {
      "value": "15s → 2s",
      "label": "复杂 RAG 首字响应延迟"
    },
    "context": "围绕电商智能客服的实时对话需求，从检索效率、向量存储与模型上下文缓存入手，缩短复杂 RAG 场景中用户等待首字回复的时间。",
    "detailLabels": [
      "优化检索链路",
      "降低存储成本",
      "复用上下文缓存"
    ],
    "outcomes": [
      "首字延迟由 15s 压缩至 2s 内",
      "向量存储占用降低 75%"
    ],
    "details": [
      "文档切片、HNSW 混合检索与 Metadata 过滤协同优化召回链路。",
      "Int8 量化降低向量存储占用 75%，兼顾检索效率与资源成本。",
      "结合 Prefix Caching 与 KV Cache，将复杂 RAG 首字延迟由 15s 压缩至 2s 内。"
    ],
    "name": "AI 实时语音对话智能客服",
    "category": "REAL-TIME CONVERSATION",
    "image": "/images/project-voice.svg",
    "tags": [
      "HNSW",
      "Int8",
      "Prefix Caching"
    ],
    "desc": "HNSW 混合检索+Int8量化，深度触发 Prefix Caching，将复杂 RAG 首字延迟压缩至 2s 内。"
  },
  {
    "id": "content",
    "summary": "把内容生产串成可恢复、可追踪的工作流。",
    "highlight": {
      "value": "−70%",
      "label": "内容生成耗时"
    },
    "context": "将自媒体内容生产拆分为多个协作阶段，通过 LangGraph 管理节点与状态，并结合持久化、异步并发和重试机制完成内容生成流程。",
    "detailLabels": [
      "编排多阶段流程",
      "持久化与进度反馈",
      "并发与异常恢复"
    ],
    "outcomes": [
      "内容生成耗时缩减 70%",
      "支持节点重试与状态恢复",
      "通过 SSE 输出实时进度"
    ],
    "details": [
      "LangGraph 子图解耦多阶段内容生成，Checkpointer 支持节点重试与状态恢复。",
      "通过 PostgreSQL 持久化工作流状态，并以 SSE 输出实时生成进度。",
      "异步并发与指数退避重试配合，生成耗时缩减 70%。"
    ],
    "name": "自媒体智能内容运营 Agent",
    "category": "INTELLIGENT WORKFLOW",
    "image": "/images/project-content.svg",
    "tags": [
      "LangGraph",
      "PostgreSQL",
      "Async"
    ],
    "desc": "基于 LangGraph 的多阶段工作流，配合 PostgreSQL 持久化与异步并发优化，生成耗时缩减 70%。"
  },
  {
    "id": "clips",
    "summary": "从长视频中提取高光，先在浏览器完成减负。",
    "highlight": {
      "value": "−99%",
      "label": "视频切片上传体积"
    },
    "context": "面对长视频上传与解析的成本，在浏览器端先提取音频，再由后端解析内容高光、生成切片文案，以分段处理支撑长视频任务。",
    "detailLabels": [
      "浏览器端预处理",
      "高光识别与文案生成",
      "长视频分段解析"
    ],
    "outcomes": [
      "上传体积减免 99%",
      "支持 6 小时长视频解析",
      "分段转录、批处理与重叠去重"
    ],
    "details": [
      "浏览器端使用 FFmpeg.wasm 提取音频，上传体积减免 99%。",
      "FastAPI 处理任务与进度流，DeepSeek 识别内容高光并生成切片文案。",
      "分段转录、批处理与重叠去重，支撑 6 小时长视频的防溢出解析。"
    ],
    "name": "AI 直播切片全栈 Agent",
    "category": "FULL-STACK APPLICATION",
    "image": "/images/project-clips.svg",
    "tags": [
      "React",
      "FFmpeg.wasm",
      "DeepSeek"
    ],
    "desc": "React + FFmpeg.wasm 纯前端提取音频，FastAPI 后端配合 DeepSeek 实现 6 小时长视频防溢出解析。"
  }
];

export const capabilities = [
  {
    "id": "agent",
    "icon": "workflow",
    "label": "Agent 与工作流",
    "title": "Agent 与工作流",
    "desc": "以状态编排、结构化输出与共享记忆，连接复杂任务的各个阶段。",
    "tags": [
      "LangGraph",
      "MCP",
      "Pydantic",
      "Checkpointer",
      "双层记忆"
    ],
    "href": "#project-content",
    "linkLabel": "查看工作流项目"
  },
  {
    "id": "rag",
    "icon": "database",
    "label": "RAG 与检索",
    "title": "RAG 与向量检索",
    "desc": "从文档切片到重排，优化知识召回链路与向量存储。",
    "tags": [
      "文档切片",
      "混合检索",
      "HNSW",
      "Cross-Encoder Rerank",
      "Milvus",
      "ChromaDB"
    ],
    "href": "#project-voice",
    "linkLabel": "查看检索优化项目"
  },
  {
    "id": "model",
    "icon": "brain",
    "label": "训练与推理",
    "title": "模型训练与推理",
    "desc": "覆盖微调语料构建、SFT / DPO，以及量化和上下文缓存优化。",
    "tags": [
      "SFT",
      "DPO",
      "ShareGPT",
      "Alpaca",
      "Int8",
      "Prefix Caching",
      "KV Cache"
    ],
    "href": "#project-voice",
    "linkLabel": "查看推理优化项目"
  },
  {
    "id": "backend",
    "icon": "server",
    "label": "后端与数据",
    "title": "后端与数据",
    "desc": "以 Python 异步并发、状态持久化和流式反馈支撑业务流程。",
    "tags": [
      "Python",
      "异步并发",
      "FastAPI",
      "PostgreSQL",
      "SSE",
      "异常重试"
    ],
    "href": "#project-content",
    "linkLabel": "查看后端实践"
  },
  {
    "id": "infra",
    "icon": "network",
    "label": "架构与部署",
    "title": "服务架构与部署",
    "desc": "构建可复用的模型网关、多租户服务与可观测的部署基建。",
    "tags": [
      "LLM Gateway",
      "多租户隔离",
      "MCP",
      "Docker",
      "Nginx",
      "调用追踪",
      "可观测性"
    ],
    "href": "#project-mcp",
    "linkLabel": "查看共享服务架构"
  },
  {
    "id": "media",
    "icon": "layers",
    "label": "前端与音视频",
    "title": "前端与音视频",
    "desc": "结合浏览器端音频提取与长视频分段处理，减少上传和解析成本。",
    "tags": [
      "React",
      "FFmpeg.wasm",
      "音频提取",
      "分段转录",
      "批处理",
      "重叠去重"
    ],
    "href": "#project-clips",
    "linkLabel": "查看视频切片项目"
  }
];
