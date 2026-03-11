(() => {
  const baseBrands = Array.isArray(window.MILK_TEA_DATA) ? window.MILK_TEA_DATA : [];

  const REGION_ORDER = ["华北", "华东", "华南", "华中", "西南", "西北", "东北", "港澳台"];

  const CITY_GROUPS = {
    华北: ["北京", "天津", "石家庄", "太原", "呼和浩特", "保定", "廊坊", "唐山", "秦皇岛", "沧州", "邯郸"],
    华东: ["上海", "南京", "苏州", "无锡", "常州", "杭州", "宁波", "温州", "合肥", "芜湖", "福州", "厦门", "泉州", "南昌", "济南", "青岛", "烟台", "潍坊", "绍兴", "金华", "嘉兴"],
    华南: ["广州", "深圳", "佛山", "东莞", "珠海", "中山", "惠州", "汕头", "南宁", "桂林", "海口", "三亚"],
    华中: ["武汉", "长沙", "郑州", "洛阳", "南阳", "襄阳", "宜昌", "岳阳", "株洲", "湘潭", "开封"],
    西南: ["成都", "重庆", "贵阳", "昆明", "拉萨", "绵阳", "遵义", "大理", "南充", "乐山"],
    西北: ["西安", "兰州", "银川", "西宁", "乌鲁木齐", "咸阳", "宝鸡", "延安"],
    东北: ["沈阳", "大连", "长春", "吉林", "哈尔滨", "齐齐哈尔"],
    港澳台: ["香港", "澳门", "台北", "新北", "台中", "台南", "高雄"]
  };

  const REGION_SCOPES = {
    national: REGION_ORDER,
    coastal: ["华北", "华东", "华南", "港澳台"],
    south: ["华南", "华中", "西南", "华东"],
    north: ["华北", "华东", "华中", "东北"],
    west: ["西南", "西北", "华中", "华东"],
    central: ["华中", "华东", "华南", "华北"],
    tw_hk: ["港澳台", "华东", "华南"]
  };

  const COVERAGE_LEVEL_SIZE = { all: 999, wide: 8, standard: 6, focus: 4, boutique: 2, hotspot: 1 };

  const BASE_COVERAGE_OVERRIDES = {
    heytea: "wide",
    naixue: "wide",
    mixue: "all",
    chabaidao: "all",
    guming: "wide",
    coco: "wide",
    shuyi: "wide",
    hushangayi: "wide",
    bawangchaji: "all",
    chayan: "focus",
    tianlala: "wide"
  };

  const PROFILE_DRINK_BANK = {
    milk: [
      { name: "招牌珍珠奶茶", category: "奶茶", basePrice: 13, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "黑糖波波奶茶", category: "奶茶", basePrice: 14, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "茉莉鲜奶绿", category: "鲜奶茶", basePrice: 15, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "桂花乌龙奶", category: "鲜奶茶", basePrice: 16, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "焦糖布丁奶茶", category: "奶茶", basePrice: 15, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "生椰奶绿", category: "鲜奶茶", basePrice: 16, sizes: ["中杯", "大杯"], serve: ["冷"] }
    ],
    fruit: [
      { name: "葡萄轻乳茶", category: "果茶", basePrice: 16, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "杨枝甘露", category: "果茶", basePrice: 16, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "白桃乌龙", category: "果茶", basePrice: 15, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "多肉芒芒", category: "果茶", basePrice: 16, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "青提茉莉", category: "果茶", basePrice: 17, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "凤梨冰茶", category: "果茶", basePrice: 15, sizes: ["中杯", "大杯"], serve: ["冷"] }
    ],
    lemon: [
      { name: "手打柠檬茶", category: "柠檬茶", basePrice: 13, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "鸭屎香柠檬", category: "柠檬茶", basePrice: 14, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "陈皮柠檬茶", category: "柠檬茶", basePrice: 14, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "暴打香水柠檬", category: "柠檬茶", basePrice: 14, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "柠檬益菌多", category: "柠檬茶", basePrice: 15, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "冰爽双柠", category: "柠檬茶", basePrice: 13, sizes: ["中杯", "大杯"], serve: ["冷"] }
    ],
    tea: [
      { name: "四季春玛奇朵", category: "纯茶", basePrice: 14, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "鸭屎香单丛", category: "纯茶", basePrice: 15, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "伯爵红茶拿铁", category: "鲜奶茶", basePrice: 16, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "乌龙奶香", category: "鲜奶茶", basePrice: 16, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "桂香红玉", category: "纯茶", basePrice: 15, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "茉香青提茶", category: "果茶", basePrice: 16, sizes: ["中杯", "大杯"], serve: ["冷"] }
    ],
    herbal: [
      { name: "招牌烧仙草", category: "烧仙草", basePrice: 13, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "芋圆烧仙草", category: "烧仙草", basePrice: 14, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "芋泥啵啵奶茶", category: "奶茶", basePrice: 15, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "血糯米奶茶", category: "奶茶", basePrice: 15, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "椰椰芋泥", category: "鲜奶茶", basePrice: 16, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "芋泥麻薯奶茶", category: "奶茶", basePrice: 17, sizes: ["中杯", "大杯"], serve: ["冷", "热"] }
    ],
    yogurt: [
      { name: "草莓酸奶", category: "酸奶", basePrice: 18, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "蓝莓酸奶", category: "酸奶", basePrice: 18, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "牛油果酸奶", category: "酸奶", basePrice: 20, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "芒果酸奶", category: "酸奶", basePrice: 19, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "酸奶葡萄", category: "酸奶", basePrice: 19, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "酸奶凤梨", category: "酸奶", basePrice: 19, sizes: ["中杯", "大杯"], serve: ["冷"] }
    ],
    mix: [
      { name: "招牌奶茶", category: "奶茶", basePrice: 12, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "杨枝甘露", category: "果茶", basePrice: 15, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "白桃乌龙", category: "果茶", basePrice: 14, sizes: ["中杯", "大杯"], serve: ["冷"] },
      { name: "黑糖波波", category: "奶茶", basePrice: 13, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "四季春", category: "纯茶", basePrice: 12, sizes: ["中杯", "大杯"], serve: ["冷", "热"] },
      { name: "手打柠檬", category: "柠檬茶", basePrice: 13, sizes: ["中杯", "大杯"], serve: ["冷"] }
    ]
  };

  const SUPPLEMENTAL_BRAND_NAMES = "茶话弄|SEVENBUS|丘大叔柠檬茶|啊T柠檬茶|台盖|鹿角巷|贡茶|KOI THE|鲜果时间|地下铁|快乐番薯|大口九|茶汤会|50岚|可不可熟成红茶|万波岛屿红茶|清心福全|乌弄原生茶饮|大苑子|丸作食茶|老虎堂|厝内小眷村|茶确幸|米芝莲|仙芋世家|茶桔便|茶本味|茶客思|都菓|黑泷堂|黑泷太郎|果呀呀|果麦|茶一巷|茶语时光|茶里王|茶与布朗|蜜菓|茶屿|茶大椰|椰不二|眷茶|本宫的茶|兰芳园茶铺|爷茶|茶研社|半糖主义|春阳茶事|喫茶小铺|一芳水果茶|迷客夏|日春木瓜牛奶|歇脚亭|茶聚|港饮之港|港士多奶茶|茶饮工坊|初茶|山住茶|柚见鲜茶|橘座|茶亭序|甘杯手作|茶猫|芋见奶茶|茶言观色|甜心摇摇|集米茶研|轻柠研究所|芝士研究所|鲜果实验室|茶咔咔|小鹿茶坊|都市奶站|清茶里|啵啵茶社|元气茶屋|芋泥研究社|橙乐蜜饮".split("|");

  const CATEGORY_HEAT = { 鲜奶茶: 92, 奶茶: 90, 果茶: 88, 柠檬茶: 84, 烧仙草: 80, 酸奶: 82, 纯茶: 78 };

  const sugarOptionsByCategory = {
    奶茶: ["无糖", "三分糖", "五分糖", "七分糖", "全糖"],
    鲜奶茶: ["无糖", "三分糖", "五分糖", "七分糖", "全糖"],
    烧仙草: ["无糖", "三分糖", "五分糖", "七分糖"],
    酸奶: ["无糖", "三分糖", "五分糖"],
    果茶: ["无糖", "三分糖", "五分糖", "七分糖"],
    柠檬茶: ["无糖", "三分糖", "五分糖", "七分糖"],
    纯茶: ["无糖", "三分糖", "五分糖"]
  };

  const fortuneTags = [
    "这杯会把今天的疲惫轻轻放下",
    "慢慢喝，心情会跟着变好",
    "今天值得被温柔对待",
    "忙完这一阵，你会看见好结果",
    "你的努力，正在悄悄开花",
    "愿你今天拥有小小的闪光时刻"
  ];

  const pairingTips = [
    "搭配一份咸口小食会更平衡",
    "如果怕腻，建议甜度选五分",
    "适合边走边喝，气氛感很好",
    "这杯配轻甜点会很搭",
    "想要更清爽可以选少冰"
  ];

  const giftTemplates = [
    "今天也辛苦了，愿这杯{drink}替你把压力轻轻放下。",
    "给认真生活的你：在{city}的这杯{drink}，是今天的小奖励。",
    "愿你在忙碌里也有柔软时刻，这杯{drink}送你一口好心情。",
    "你已经很棒了，慢慢喝完这杯{drink}，继续闪闪发光。",
    "愿你的努力都有回音，这杯{drink}会把温暖送到你心里。",
    "不管今天多累，都别忘了照顾自己，这杯{drink}就是你的拥抱。"
  ];

  function hashString(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      h ^= text.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    return function random() {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function uniqueValues(list) {
    return [...new Set(list)].filter(Boolean);
  }

  function normalizeText(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[·.]/g, "");
  }

  function chooseFrom(list, randomFn) {
    if (!Array.isArray(list) || list.length === 0) {
      return null;
    }
    return list[Math.floor(randomFn() * list.length)];
  }

  function deterministicSample(list, count, seedText) {
    const rng = mulberry32(hashString(seedText));
    const source = [...list];
    const output = [];
    while (source.length > 0 && output.length < count) {
      output.push(source.splice(Math.floor(rng() * source.length), 1)[0]);
    }
    return output;
  }

  function getAllCities() {
    return uniqueValues(REGION_ORDER.flatMap((region) => CITY_GROUPS[region] || []));
  }

  function getCitiesByRegion(region) {
    return region === "全国" ? getAllCities() : CITY_GROUPS[region] || [];
  }

  function inferProfile(name) {
    if (/柠/.test(name)) return "lemon";
    if (/酸奶/.test(name)) return "yogurt";
    if (/芋|仙芋|烧仙草/.test(name)) return "herbal";
    if (/果|椰|橙|柚|莓|桃/.test(name)) return "fruit";
    if (/红茶|熟成|茶汤|清心|乌弄|贡茶|KOI|50岚|可不可|万波|大苑子|歇脚亭|茶聚|春阳|茶里王/.test(name)) return "tea";
    if (/奶|波波|布丁|黑糖/.test(name)) return "milk";
    return "mix";
  }

  function inferScope(name, idx) {
    if (/港|台|KOI|50岚|贡茶|可不可|万波|清心|乌弄|大苑子|歇脚亭|茶聚|春阳/.test(name)) return "tw_hk";
    if (/柠/.test(name)) return "south";
    const seeds = ["coastal", "south", "north", "central", "west"];
    return seeds[hashString(`${name}-${idx}`) % seeds.length];
  }

  function inferCoverage(scope, name) {
    if (scope === "tw_hk") return "focus";
    if (/研究所|实验室/.test(name)) return "boutique";
    const score = hashString(name) % 4;
    return score === 0 ? "wide" : score === 1 ? "standard" : "focus";
  }

  function buildSupplementalBrands() {
    return SUPPLEMENTAL_BRAND_NAMES.map((name, idx) => {
      const profile = inferProfile(name);
      const scope = inferScope(name, idx);
      const coverage = inferCoverage(scope, name);
      const regions = REGION_SCOPES[scope] || REGION_SCOPES.central;

      const bank = PROFILE_DRINK_BANK[profile] || PROFILE_DRINK_BANK.mix;
      const drinks = deterministicSample(bank, 4, `${name}|drinks`).map((drink) => ({
        name: drink.name,
        category: drink.category,
        basePrice: drink.basePrice,
        sizes: [...drink.sizes],
        serve: [...drink.serve]
      }));

      const signature = {
        name: `${name}招牌${profile === "lemon" ? "柠檬茶" : "奶茶"}`,
        category: profile === "lemon" ? "柠檬茶" : "奶茶",
        basePrice: profile === "lemon" ? 14 : 15,
        sizes: ["中杯", "大杯"],
        serve: profile === "lemon" ? ["冷"] : ["冷", "热"]
      };

      if (!drinks.some((drink) => drink.name === signature.name)) {
        drinks.unshift(signature);
      }

      return {
        id: `sup_${idx + 1}`,
        name,
        regions,
        coverage,
        drinks: drinks.slice(0, 5)
      };
    });
  }

  function mergeBrandCatalog() {
    const supplemental = buildSupplementalBrands();
    const nameSet = new Set(baseBrands.map((brand) => normalizeText(brand.name)));
    const merged = [...baseBrands];

    supplemental.forEach((brand) => {
      if (!nameSet.has(normalizeText(brand.name))) {
        merged.push(brand);
      }
    });

    return merged;
  }

  const mergedRawBrands = mergeBrandCatalog();

  function deriveBrandCities(brand) {
    const level = brand.coverage || BASE_COVERAGE_OVERRIDES[brand.id] || "standard";
    const takeSize = COVERAGE_LEVEL_SIZE[level] || COVERAGE_LEVEL_SIZE.standard;

    return uniqueValues(
      (brand.regions || []).flatMap((region) => {
        const group = CITY_GROUPS[region] || [];
        return takeSize >= group.length ? group : group.slice(0, takeSize);
      })
    );
  }

  const brands = mergedRawBrands.map((brand) => {
    const cities = deriveBrandCities(brand);
    return { ...brand, cities, citySet: new Set(cities) };
  });

  const elements = {
    regionSelect: document.getElementById("regionSelect"),
    citySelect: document.getElementById("citySelect"),
    categorySelect: document.getElementById("categorySelect"),
    tempSelect: document.getElementById("tempSelect"),
    brandSearch: document.getElementById("brandSearch"),
    brandList: document.getElementById("brandList"),
    brandCount: document.getElementById("brandCount"),
    candidateCount: document.getElementById("candidateCount"),
    filterSummary: document.getElementById("filterSummary"),
    cityTopFive: document.getElementById("cityTopFive"),
    cityTopHint: document.getElementById("cityTopHint"),
    onlyTopFiveToggle: document.getElementById("onlyTopFiveToggle"),
    clearTopPickBtn: document.getElementById("clearTopPickBtn"),
    brandTotal: document.getElementById("brandTotal"),
    cityTotal: document.getElementById("cityTotal"),
    drinkTotal: document.getElementById("drinkTotal"),
    dailyBtn: document.getElementById("dailyBtn"),
    randomBtn: document.getElementById("randomBtn"),
    resetFiltersBtn: document.getElementById("resetFiltersBtn"),
    selectAllBrands: document.getElementById("selectAllBrands"),
    clearAllBrands: document.getElementById("clearAllBrands"),
    resultCard: document.getElementById("resultCard")
  };

  const state = {
    region: "全国",
    city: "全部城市",
    category: "全部",
    temperature: "任意温度",
    search: "",
    onlyTopFive: false,
    selectedTopPickKey: "",
    cityTopFiveItems: [],
    isDrawing: false,
    selectedBrandIds: new Set(brands.map((brand) => brand.id))
  };

  function fillSelect(selectElement, options, activeValue) {
    selectElement.innerHTML = "";
    options.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      option.selected = value === activeValue;
      selectElement.appendChild(option);
    });
  }

  function getAllRegions() {
    return ["全国", ...REGION_ORDER];
  }

  function getAllCategories() {
    const categories = uniqueValues(brands.flatMap((brand) => brand.drinks.map((drink) => drink.category)));
    return ["全部", ...categories];
  }

  function getAllTemperatures() {
    return ["任意温度", "冷", "热"];
  }

  function renderStats() {
    const drinkTotal = brands.reduce((sum, brand) => sum + brand.drinks.length, 0);
    elements.brandTotal.textContent = String(brands.length);
    elements.cityTotal.textContent = String(getAllCities().length);
    elements.drinkTotal.textContent = String(drinkTotal);
  }

  function isBrandInGeo(brand) {
    if (state.region !== "全国" && !brand.regions.includes(state.region)) return false;
    if (state.city !== "全部城市" && !brand.citySet.has(state.city)) return false;
    return true;
  }

  function getUnavailableReason(brand) {
    if (state.region !== "全国" && !brand.regions.includes(state.region)) return "该地区暂无";
    if (state.city !== "全部城市" && !brand.citySet.has(state.city)) return "该城市暂无";
    return "";
  }

  function getVisibleBrands() {
    const keyword = state.search.trim().toLowerCase();
    return brands.filter((brand) => (keyword ? brand.name.toLowerCase().includes(keyword) : true));
  }

  function candidateKey(candidate) {
    return `${candidate.brand.id}__${candidate.drink.name}`;
  }

  function renderFilterSummary() {
    const topLabel = state.onlyTopFive ? (state.city === "全部城市" ? "TOP5限定（请先选城市）" : "TOP5限定") : "全量候选";
    const lockLabel = state.selectedTopPickKey ? "已锁定一个TOP项" : "未锁定TOP项";
    elements.filterSummary.textContent = `当前位置：${state.region} · ${state.city}，偏好：${state.temperature}，品类：${state.category}，模式：${topLabel}（${lockLabel}）`;
  }

  function renderFilters() {
    fillSelect(elements.regionSelect, getAllRegions(), state.region);
    const cityOptions = ["全部城市", ...getCitiesByRegion(state.region)];
    if (!cityOptions.includes(state.city)) state.city = "全部城市";
    fillSelect(elements.citySelect, cityOptions, state.city);
    fillSelect(elements.categorySelect, getAllCategories(), state.category);
    fillSelect(elements.tempSelect, getAllTemperatures(), state.temperature);
    elements.brandSearch.value = state.search;
    elements.onlyTopFiveToggle.checked = state.onlyTopFive;
    renderFilterSummary();
  }

  function renderBrandList() {
    const visibleBrands = getVisibleBrands();
    visibleBrands.forEach((brand) => {
      if (!isBrandInGeo(brand)) state.selectedBrandIds.delete(brand.id);
    });

    elements.brandList.innerHTML = "";

    visibleBrands.forEach((brand) => {
      const wrapper = document.createElement("div");
      wrapper.className = "brand-item";
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = brand.id;
      checkbox.checked = state.selectedBrandIds.has(brand.id);
      const available = isBrandInGeo(brand);
      checkbox.disabled = !available;

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) state.selectedBrandIds.add(brand.id);
        else state.selectedBrandIds.delete(brand.id);
        refreshTopFiveAndCounts();
      });

      const text = document.createElement("span");
      const reason = getUnavailableReason(brand);
      text.textContent = available ? brand.name : `${brand.name}（${reason}）`;

      label.appendChild(checkbox);
      label.appendChild(text);
      wrapper.appendChild(label);
      elements.brandList.appendChild(wrapper);
    });
  }

  function buildBaseCandidates() {
    const candidates = [];
    brands.forEach((brand) => {
      if (!state.selectedBrandIds.has(brand.id)) return;
      if (!isBrandInGeo(brand)) return;
      brand.drinks.forEach((drink) => {
        if (state.category !== "全部" && drink.category !== state.category) return;
        if (state.temperature !== "任意温度" && !drink.serve.includes(state.temperature)) return;
        candidates.push({ brand, drink });
      });
    });
    return candidates;
  }

  function popularityScore(candidate, city) {
    const base = CATEGORY_HEAT[candidate.drink.category] || 80;
    const cityBoost = hashString(`${city}|${candidate.drink.name}`) % 14;
    const brandBoost = hashString(candidate.brand.name) % 12;
    const wave = hashString(`${city}|${candidate.brand.id}|${candidate.drink.name}`) % 10;
    return Math.min(99, base + Math.floor(cityBoost / 2) + Math.floor(brandBoost / 2) + Math.floor(wave / 2));
  }

  function getTopFiveForCurrentCity(baseCandidates) {
    if (state.city === "全部城市") return [];

    const map = new Map();
    baseCandidates.forEach((candidate) => {
      const key = candidateKey(candidate);
      const score = popularityScore(candidate, state.city);
      const existing = map.get(key);
      if (!existing || score > existing.hotScore) map.set(key, { ...candidate, hotScore: score });
    });

    return [...map.values()]
      .sort((a, b) => b.hotScore - a.hotScore)
      .slice(0, 5)
      .map((item, idx) => ({ ...item, rank: idx + 1 }));
  }

  function renderTopFive(baseCandidates) {
    const topFive = getTopFiveForCurrentCity(baseCandidates);
    state.cityTopFiveItems = topFive;

    const validKeys = new Set(topFive.map((item) => candidateKey(item)));
    if (state.selectedTopPickKey && !validKeys.has(state.selectedTopPickKey)) state.selectedTopPickKey = "";

    elements.cityTopFive.innerHTML = "";

    if (state.city === "全部城市") {
      elements.cityTopHint.textContent = "先选择一个具体城市，即可显示该城市最受欢迎 TOP5。";
      return;
    }

    if (topFive.length === 0) {
      elements.cityTopHint.textContent = "当前筛选下该城市暂无 TOP5，试试放宽品牌或品类。";
      return;
    }

    elements.cityTopHint.textContent = `已按 ${state.city} 当前筛选生成热门 TOP5，点击可锁定。`;

    topFive.forEach((item) => {
      const key = candidateKey(item);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `top-item ${state.selectedTopPickKey === key ? "selected" : ""}`;
      button.innerHTML = `
        <span class="top-rank">TOP ${item.rank}</span>
        <span class="top-name">${item.brand.name} · ${item.drink.name}</span>
        <span class="top-meta">热度 ${item.hotScore} · ${item.drink.category}</span>
      `;

      button.addEventListener("click", () => {
        state.selectedTopPickKey = state.selectedTopPickKey === key ? "" : key;
        refreshTopFiveAndCounts();
        runDailyImmediate();
      });

      elements.cityTopFive.appendChild(button);
    });
  }

  function buildCandidates() {
    const baseCandidates = buildBaseCandidates();
    renderTopFive(baseCandidates);

    let candidates = [...baseCandidates];
    const topKeys = new Set(state.cityTopFiveItems.map((item) => candidateKey(item)));

    if (state.onlyTopFive && state.city !== "全部城市") candidates = candidates.filter((candidate) => topKeys.has(candidateKey(candidate)));
    if (state.selectedTopPickKey) candidates = candidates.filter((candidate) => candidateKey(candidate) === state.selectedTopPickKey);

    return candidates;
  }

  function countCoverageCities() {
    const covered = new Set();

    brands.forEach((brand) => {
      if (!state.selectedBrandIds.has(brand.id)) return;
      if (state.region !== "全国" && !brand.regions.includes(state.region)) return;

      const hasMatchDrink = brand.drinks.some((drink) => {
        if (state.category !== "全部" && drink.category !== state.category) return false;
        if (state.temperature !== "任意温度" && !drink.serve.includes(state.temperature)) return false;
        return true;
      });

      if (!hasMatchDrink) return;

      getCitiesByRegion(state.region).forEach((city) => {
        if (brand.citySet.has(city) && (state.city === "全部城市" || city === state.city)) covered.add(city);
      });
    });

    return covered.size;
  }

  function refreshTopFiveAndCounts() {
    const visible = getVisibleBrands();
    const selectedVisible = visible.filter((brand) => state.selectedBrandIds.has(brand.id)).length;
    elements.brandCount.textContent = `已选品牌：${state.selectedBrandIds.size}（当前视图已选 ${selectedVisible}/${visible.length}）`;

    const candidates = buildCandidates();
    const coverage = countCoverageCities();
    elements.candidateCount.textContent = `符合条件：${candidates.length} 款 | 覆盖城市：${coverage} 个`;
    renderFilterSummary();
  }

  function todayKey() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());

    const obj = {};
    parts.forEach((part) => {
      if (part.type !== "literal") obj[part.type] = part.value;
    });

    return `${obj.year}-${obj.month}-${obj.day}`;
  }

  function estimatePrice(drink, size) {
    const idx = drink.sizes.indexOf(size);
    return idx <= 0 ? drink.basePrice : drink.basePrice + idx * 2;
  }

  function getSugarOptions(category) {
    return sugarOptionsByCategory[category] || ["无糖", "三分糖", "五分糖", "七分糖", "全糖"];
  }

  function getIceOptions(service) {
    return service === "热" ? ["热饮"] : ["正常冰", "少冰", "去冰"];
  }

  function getRecommendationCity(brand, randomFn) {
    if (state.city !== "全部城市") return state.city;
    const cityPool = getCitiesByRegion(state.region).filter((city) => brand.citySet.has(city));
    return chooseFrom(cityPool, randomFn) || chooseFrom(brand.cities, randomFn) || "城市待补充";
  }

  function getTopRankLabel(candidate) {
    const key = candidateKey(candidate);
    const item = state.cityTopFiveItems.find((entry) => candidateKey(entry) === key);
    return item ? `TOP ${item.rank}` : "非TOP5";
  }

  function createGiftMessage(result, randomFn) {
    const template = chooseFrom(giftTemplates, randomFn) || giftTemplates[0];
    return template.replaceAll("{drink}", result.drink.name).replaceAll("{city}", result.city).replaceAll("{brand}", result.brand.name);
  }

  function pickRecommendation(candidates, randomFn) {
    if (candidates.length === 0) return null;

    const candidate = chooseFrom(candidates, randomFn);
    const size = chooseFrom(candidate.drink.sizes, randomFn) || "常规杯";
    const service = state.temperature === "任意温度" ? chooseFrom(candidate.drink.serve, randomFn) : state.temperature;
    const sugar = chooseFrom(getSugarOptions(candidate.drink.category), randomFn);
    const ice = chooseFrom(getIceOptions(service), randomFn);
    const city = getRecommendationCity(candidate.brand, randomFn);

    const result = {
      ...candidate,
      size,
      service,
      sugar,
      ice,
      city,
      price: estimatePrice(candidate.drink, size),
      fortune: chooseFrom(fortuneTags, randomFn),
      pairing: chooseFrom(pairingTips, randomFn),
      topRank: getTopRankLabel(candidate)
    };

    result.giftMessage = createGiftMessage(result, randomFn);
    return result;
  }

  function renderEmpty(message) {
    elements.resultCard.className = "result-card empty";
    elements.resultCard.innerHTML = `<p>${message}</p>`;
  }

  function renderPreview(result) {
    if (!result) {
      renderEmpty("正在摇奶茶签...");
      return;
    }

    elements.resultCard.className = "result-card preview";
    elements.resultCard.innerHTML = `
      <p class="preview-tag">抽签中...</p>
      <p class="preview-main">${result.brand.name} · ${result.drink.name}</p>
      <div class="preview-line"><span></span></div>
    `;
  }

  function renderResult(result, mode, dateKeyValue) {
    if (!result) {
      renderEmpty("当前筛选条件没有匹配饮品，试试放宽品牌、城市、品类或冷热筛选。");
      return;
    }

    const modeLabel = mode === "daily" ? `今日固定推荐（${dateKeyValue}）` : "即时随机推荐";

    elements.resultCard.className = "result-card";
    elements.resultCard.innerHTML = `
      <div class="gift-banner">
        <span>赠语</span>
        <p>${result.giftMessage}</p>
      </div>
      <div class="result-main">
        <div>
          <p class="result-brand">${result.brand.name}</p>
          <p class="result-drink">${result.drink.name} · ${result.drink.category}</p>
        </div>
        <p class="price">约 ¥${result.price}</p>
      </div>
      <div class="meta-list">
        <span class="meta">城市：${result.city}</span>
        <span class="meta">冷热：${result.service}</span>
        <span class="meta">杯型建议：${result.size}</span>
        <span class="meta">甜度：${result.sugar}</span>
        <span class="meta">冰量：${result.ice}</span>
        <span class="meta hot">热榜：${result.topRank}</span>
      </div>
      <p class="note">${modeLabel} · ${result.fortune}</p>
      <p class="pairing">搭配建议：${result.pairing}</p>
    `;
  }

  function getSeedKey(dateKeyValue) {
    const sortedBrandIds = [...state.selectedBrandIds].sort().join(",");
    return [dateKeyValue, state.region, state.city, state.category, state.temperature, state.onlyTopFive, state.selectedTopPickKey, sortedBrandIds].join("|");
  }

  function getDailyRecommendation(candidates) {
    const dateKeyValue = todayKey();
    const rng = mulberry32(hashString(getSeedKey(dateKeyValue)));
    return { result: pickRecommendation(candidates, rng), dateKeyValue };
  }

  function setDrawingState(isDrawing) {
    state.isDrawing = isDrawing;
    elements.dailyBtn.disabled = isDrawing;
    elements.randomBtn.disabled = isDrawing;
    elements.resetFiltersBtn.disabled = isDrawing;
  }

  function runDailyImmediate() {
    const candidates = buildCandidates();
    const { result, dateKeyValue } = getDailyRecommendation(candidates);
    renderResult(result, "daily", dateKeyValue);
    refreshTopFiveAndCounts();
  }

  function runPick(mode) {
    if (state.isDrawing) return;

    const candidates = buildCandidates();
    if (candidates.length === 0) {
      renderEmpty("当前条件下没有可选饮品，请调整筛选后重试。");
      refreshTopFiveAndCounts();
      return;
    }

    setDrawingState(true);
    let frame = 0;
    const timer = setInterval(() => {
      frame += 1;
      renderPreview(pickRecommendation(candidates, Math.random));
      if (frame >= 10) {
        clearInterval(timer);
        if (mode === "daily") {
          const { result, dateKeyValue } = getDailyRecommendation(candidates);
          renderResult(result, "daily", dateKeyValue);
        } else {
          renderResult(pickRecommendation(candidates, Math.random), "random", todayKey());
        }
        refreshTopFiveAndCounts();
        setDrawingState(false);
      }
    }, 90);
  }

  function resetFilters() {
    state.region = "全国";
    state.city = "全部城市";
    state.category = "全部";
    state.temperature = "任意温度";
    state.search = "";
    state.onlyTopFive = false;
    state.selectedTopPickKey = "";
    state.selectedBrandIds = new Set(brands.map((brand) => brand.id));

    renderFilters();
    renderBrandList();
    runDailyImmediate();
  }

  function bindEvents() {
    elements.regionSelect.addEventListener("change", (event) => {
      state.region = event.target.value;
      state.selectedTopPickKey = "";
      renderFilters();
      renderBrandList();
      runDailyImmediate();
    });

    elements.citySelect.addEventListener("change", (event) => {
      state.city = event.target.value;
      state.selectedTopPickKey = "";
      renderBrandList();
      runDailyImmediate();
    });

    elements.categorySelect.addEventListener("change", (event) => {
      state.category = event.target.value;
      state.selectedTopPickKey = "";
      runDailyImmediate();
    });

    elements.tempSelect.addEventListener("change", (event) => {
      state.temperature = event.target.value;
      state.selectedTopPickKey = "";
      runDailyImmediate();
    });

    elements.brandSearch.addEventListener("input", (event) => {
      state.search = event.target.value;
      renderBrandList();
      refreshTopFiveAndCounts();
    });

    elements.onlyTopFiveToggle.addEventListener("change", (event) => {
      state.onlyTopFive = event.target.checked;
      runDailyImmediate();
    });

    elements.clearTopPickBtn.addEventListener("click", () => {
      state.selectedTopPickKey = "";
      runDailyImmediate();
    });

    elements.selectAllBrands.addEventListener("click", () => {
      getVisibleBrands().forEach((brand) => {
        if (isBrandInGeo(brand)) state.selectedBrandIds.add(brand.id);
      });
      renderBrandList();
      runDailyImmediate();
    });

    elements.clearAllBrands.addEventListener("click", () => {
      getVisibleBrands().forEach((brand) => state.selectedBrandIds.delete(brand.id));
      renderBrandList();
      renderEmpty("品牌已清空，请至少选择一个品牌后再抽取。");
      refreshTopFiveAndCounts();
    });

    elements.dailyBtn.addEventListener("click", () => runPick("daily"));
    elements.randomBtn.addEventListener("click", () => runPick("random"));
    elements.resetFiltersBtn.addEventListener("click", resetFilters);
  }

  function init() {
    renderStats();
    renderFilters();
    renderBrandList();
    bindEvents();
    runDailyImmediate();
  }

  init();
})();
