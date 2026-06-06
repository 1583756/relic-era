// ═══════════════════════════════════════════════════════
// 遗物纪元 v0.2 - 核心系统完整版
// ═══════════════════════════════════════════════════════

// ── 天赋数据库（精简版，覆盖S/A/B/C/D各级） ──
const TALENT_DB = {
  S: [
    { id:'s1', name:'狂骨', grade:'S', type:'双刃剑',
      desc:'理智熔炉 — 理智越低，杀意越盛',
      manifesto:'"我的骨头在歌唱。那不是欢愉的歌——是饥渴。"\n"我疯即强！"',
      effects:{ sanMaxMult:0.6, dmgMult:1.8, strMult:1.25, agiMult:1.25, immuneFear:true, berserkAtSan:20 }},
    { id:'s2', name:'回溯', grade:'S', type:'双刃剑',
      desc:'因果断裂 — 回溯时间，代价是永久属性',
      manifesto:'"我见过明天的尸体——是我自己的。"\n"我逆即存！"',
      effects:{ canRewind:true, rewindCooldown:60, attrCostOnRewind:1 }},
    { id:'s5', name:'天命', grade:'S', type:'纯正向·欧皇',
      desc:'遗物纪元的宠儿 — 全属性成长+30%，开局金色遗物',
      manifesto:'"连命运都在向我低头。"\n"我选即中！"',
      effects:{ attrGrowthMult:1.3, fteBonus:50, dropQuality:1, startRelic:'legendary' }},
  ],
  A: [
    { id:'a1', name:'血契', grade:'A', type:'双刃剑',
      desc:'濒死爆发 — HP越低伤害越高，但无法被治疗',
      manifesto:'"你的血，就是我的药。"\n"我契即血！"',
      effects:{ noHeal:true, lowHpDmgMult:2.0, lowHpThreshold:0.3 }},
    { id:'a2', name:'锈蚀', grade:'A', type:'双刃剑',
      desc:'腐蚀之触 — 攻击附带腐蚀，但装备耐久加速消耗',
      manifesto:'"锈蚀不是终结，而是另一种永恒。"\n"我锈即蚀！"',
      effects:{ corrosionDmg:0.08, durabilityMult:0.5 }},
    { id:'a9', name:'织命', grade:'A', type:'纯正向·欧皇',
      desc:'命运编织者 — 掉落品质提升，概率操控',
      manifesto:'"命运的线在我手中。"\n"我织即命！"',
      effects:{ dropQuality:1, fteBonus:20, critBonus:0.15 }},
    { id:'a19', name:'星陨', grade:'A', type:'纯正向·欧皇',
      desc:'星辰眷顾 — 夜间全属性+20%',
      manifesto:'"星辰为我加冕。"\n"我星即辉！"',
      effects:{ nightAttrMult:1.2 }},
  ],
  B: [
    { id:'b1', name:'碎骨', grade:'B', type:'双刃剑',
      desc:'骨锤重击 — 无视30%护甲，但自身骨骼反噬',
      manifesto:'"我拳即锤！"',
      effects:{ armorPen:0.3, selfDmgOnHit:3, dmgMult:1.4 }},
    { id:'b5', name:'债契', grade:'B', type:'双刃剑',
      desc:'命运透支 — 预支幸运，未来偿还',
      manifesto:'"我债即运！"',
      effects:{ fteBonus:6, fteDebt:-4, debtDuration:5 }},
    { id:'b10', name:'暗语', grade:'B', type:'双刃剑',
      desc:'深渊低语 — 可与怪物对话，但SAN持续流失',
      manifesto:'"我语即渊！"',
      effects:{ canTalkMonster:true, sanDrain:0.5 }},
  ],
  C: [
    { id:'c1', name:'铁胃', grade:'C', type:'双刃剑',
      desc:'食用腐烂食物不受惩罚',
      manifesto:'"我胃即铁！"',
      effects:{ foodSafe:true }},
    { id:'c2', name:'夜视', grade:'C', type:'双刃剑',
      desc:'黑暗中视野不受影响',
      manifesto:'"我瞳即夜！"',
      effects:{ nightVision:true, agiBonus:2, lightWeakness:true }},
    { id:'c3', name:'厚茧', grade:'C', type:'双刃剑',
      desc:'物理伤害降低8%',
      manifesto:'"我皮即茧！"',
      effects:{ dmgReduction:0.08, agiPenalty:-1 }},
    { id:'c_e1', name:'吉星', grade:'C', type:'纯正向·欧皇',
      desc:'幸运值+5，掉落率+10%',
      manifesto:'"我运即星！"',
      effects:{ fteBonus:5, dropBonus:0.1 }},
    { id:'c_e2', name:'铁壁', grade:'C', type:'纯正向·欧皇',
      desc:'物理防御+10%，无代价',
      manifesto:'"我壁即铁！"',
      effects:{ defMult:1.1 }},
  ],
  D: [
    { id:'d1', name:'脆骨', grade:'D', type:'双刃剑',
      desc:'暴击伤害+0.3，但最大HP-8%',
      manifesto:'"我碎即刃！"',
      effects:{ critDmgBonus:0.3, hpMaxMult:0.92 }},
    { id:'d2', name:'飘絮', grade:'D', type:'双刃剑',
      desc:'坠落伤害-40%，但击退效果+25%',
      manifesto:'"我轻即翼！"',
      effects:{ fallDmgMult:0.6, knockbackMult:1.25 }},
    { id:'d3', name:'莽撞', grade:'D', type:'双刃剑',
      desc:'战斗前3秒攻速+20%，但无法防御',
      manifesto:'"我冲即破！"',
      effects:{ burstAtkSpd:1.2, noDefendFirst:3 }},
    { id:'d4', name:'暗瞳', grade:'D', type:'双刃剑',
      desc:'黑暗视野+30%，但强光下命中率-10%',
      manifesto:'"我暗即明！"',
      effects:{ darkVision:1.3, lightHitPenalty:-0.1 }},
    { id:'d5', name:'孤僻', grade:'D', type:'双刃剑',
      desc:'商店价格+8%，但宝箱发现率+15%',
      manifesto:'"我独即全！"',
      effects:{ shopPriceMult:1.08, chestFindBonus:0.15 }},
    { id:'d_e1', name:'微光', grade:'D', type:'纯正向·欧皇',
      desc:'篝火恢复速度+10%',
      manifesto:'"我光即暖！"',
      effects:{ bonfireHealMult:1.1 }},
    { id:'d_e2', name:'鹰眼', grade:'D', type:'纯正向·欧皇',
      desc:'远程命中率+5%',
      manifesto:'"我视即锐！"',
      effects:{ hitBonus:0.05 }},
  ]
};

// 天赋抽取概率
const TALENT_WEIGHTS = { S:0.025, A:0.075, B:0.15, C:0.30, D:0.45 };

function rollTalent() {
  const r = Math.random();
  let cum = 0;
  let grade = 'D';
  for (const [g, w] of Object.entries(TALENT_WEIGHTS)) {
    cum += w;
    if (r < cum) { grade = g; break; }
  }
  const pool = TALENT_DB[grade];
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── 途径系统 ──
const PATHS = {
  knowledge: {
    name: '知识途径', subtitle: '认知即污染',
    desc: '通过阅读禁忌书籍、解析古代符文来积累知识。\n知识越高，技能威力越强，但SAN值流失越快。',
    icon: '📖', sanMax: 100, intBonus: 5,
    skills: [
      { name:'真视之眼', cost:8, desc:'看破弱点，下次攻击暴击率+50%', effect:'critBoost' },
      { name:'精神冲击', cost:15, desc:'直接攻击目标精神，造成INT×2伤害', effect:'mindBlast' },
    ]
  },
  bizarre: {
    name: '诡异途径', subtitle: '主动拥抱畸变',
    desc: '变身成诡异形态获得强大战斗力。\n变身越彻底，污染越严重，最终可能失去自我。',
    icon: '🐙', sanMax: 60, conBonus: 5,
    skills: [
      { name:'兽化变身', cost:10, desc:'浅层兽化，STR×2，持续3回合', effect:'beastForm' },
      { name:'撕裂爪击', cost:5, desc:'连续三次攻击，每次附加流血', effect:'rendClaw' },
    ]
  },
  mechanism: {
    name: '机械途径', subtitle: '抛弃血肉，驾驭钢铁',
    desc: '改造身体或制造机械仆从。\n需要燃料/零件维护，机械可能故障。',
    icon: '⚙️', sanMax: 80, prcBonus: 5,
    skills: [
      { name:'蒸汽喷射', cost:8, desc:'位移+击退，造成PRC×1.5伤害', effect:'steamBlast' },
      { name:'部署炮台', cost:12, desc:'放置自动炮台，每回合自动攻击', effect:'deployTurret' },
    ]
  },
  divine: {
    name: '神选途径', subtitle: '被高位存在选中',
    desc: '你无法选择神，神选择你。\n随机降下神迹，但代价是自由意志。',
    icon: '👁️', sanMax: Math.floor(50+Math.random()*70), divBonus: 5,
    skills: [
      { name:'祈求神迹', cost:0, desc:'向神祈祷，50%概率降下神迹', effect:'prayMiracle' },
      { name:'神圣制裁', cost:20, desc:'降下光柱，造成DIV×3真实伤害', effect:'holySmite' },
    ]
  }
};

// ── 怪物数据库 ──
const ENEMIES = {
  wanderer: {
    name:'蹒跚者', hp:40, maxHp:40, horror:1, dmg:8,
    desc:'它曾是一个成年男性，脊椎以不可能的角度弯曲，双臂拖曳在碎石上。',
    sanLoss:5, xp:15, loot:['cloth_scrap'],
    abilities:[]
  },
  rat_swarm: {
    name:'雾鼠群', hp:30, maxHp:30, horror:1, dmg:12,
    desc:'半透明皮肤，多余的眼睛长在背部，尾巴融合成蠕动的触须。',
    sanLoss:8, xp:20, loot:['mutant_gland'],
    abilities:[{name:'蜂拥',trigger:'onAllyDeath',effect:'atkSpeedUp'}]
  },
  whisper_moth: {
    name:'低语蛾', hp:20, maxHp:20, horror:2, dmg:5,
    desc:'翅膀上的纹路酷似人脸——每张面孔都不同，表情凝固在尖叫的瞬间。',
    sanLoss:10, xp:25, loot:['whisper_dust'],
    abilities:[{name:'低语粉尘',trigger:'onDeath',effect:'sanCheck'}]
  },
  rust_golem: {
    name:'锈傀儡', hp:60, maxHp:60, horror:1, dmg:15,
    desc:'一米五高的金属构造体，关节反向弯曲，胸腔内嵌着发光的符文核心。',
    sanLoss:5, xp:30, loot:['rune_core','rust_gear'],
    abilities:[{name:'符文脉冲',trigger:'every3Turns',effect:'aoeDmg'}]
  },
  shadow_crawler: {
    name:'影行者', hp:50, maxHp:50, horror:3, dmg:18,
    desc:'没有固定形体，像一团流动的黑雾，只在攻击时凝聚出利爪般的附肢。',
    sanLoss:15, xp:40, loot:['shadow_essence'],
    abilities:[{name:'影遁',trigger:'below50hp',effect:'evasion50'}]
  },
  // Boss
  mist_lord: {
    name:'雾中之主', hp:200, maxHp:200, horror:5, dmg:25,
    desc:'迷雾凝聚成人形，高达三米。它没有面孔，只有一个不断旋转的漩涡——那是它的"嘴"。',
    sanLoss:25, xp:200, loot:['mist_heart','legendary_relic'],
    isBoss:true,
    phases:[
      {hpThreshold:0.7, name:'第一阶段：雾之形态', abilities:['mist_shield','fog_blast']},
      {hpThreshold:0.3, name:'第二阶段：真实显现', abilities:['reality_tear','san_drain_aura']},
    ]
  }
};

// ── 道具数据库 ──
const ITEMS = {
  health_potion: { name:'生命药剂', desc:'恢复30点HP', type:'consumable', effect:{heal:30} },
  san_potion: { name:'理智药剂', desc:'恢复20点SAN', type:'consumable', effect:{sanRestore:20} },
  rusty_sword: { name:'锈蚀短剑', desc:'攻击力+8', type:'weapon', grade:'普通', effect:{atkBonus:8} },
  iron_blade: { name:'铁刃长剑', desc:'攻击力+15', type:'weapon', grade:'精良', effect:{atkBonus:15} },
  leather_armor: { name:'皮甲', desc:'防御+5', type:'armor', grade:'普通', effect:{defBonus:5} },
  chain_mail: { name:'锁子甲', desc:'防御+12', type:'armor', grade:'精良', effect:{defBonus:12} },
  unknown_amulet: { name:'未知护符', desc:'散发微弱蓝光的遗物，似乎能抵御迷雾', type:'relic', grade:'稀有', effect:{sanResist:0.1} },
  mist_heart: { name:'雾之心', desc:'从雾中之主身上掉落的超凡遗物', type:'relic', grade:'超凡', effect:{sanResist:0.3, mistWalk:true} },
};

// ═══ 游戏状态 ═══
class GameState {
  constructor() {
    // 基础属性
    this.str = 10; this.agi = 10; this.con = 10;
    this.int = 10; this.prc = 10; this.div = 0; this.fte = 5;
    
    // 衍生属性
    this.maxHp = 100; this.hp = 100;
    this.maxSan = 100; this.san = 100;
    this.atk = 10; this.def = 5;
    this.critRate = 0.05; this.critDmg = 1.5;
    this.dodgeRate = 0.05;
    
    // 天赋
    this.talent = null;
    
    // 途径
    this.path = null;
    this.pathLevel = 5; // 序列5
    
    // 装备
    this.weapon = null;
    this.armor = null;
    this.relic = null;
    
    // 背包
    this.inventory = [];
    this.gold = 50;
    
    // 战斗状态
    this.buffs = [];
    this.turnCount = 0;
    this.turretActive = false;
    this.beastFormTurns = 0;
    
    // 游戏进度
    this.flags = {};
    this.killCount = 0;
    this.deathCount = 0;
  }

  // 应用天赋效果
  applyTalent(talent) {
    this.talent = talent;
    const e = talent.effects;
    if (e.sanMaxMult) this.maxSan = Math.floor(this.maxSan * e.sanMaxMult);
    if (e.hpMaxMult) this.maxHp = Math.floor(this.maxHp * e.hpMaxMult);
    if (e.strMult) this.str = Math.floor(this.str * e.strMult);
    if (e.agiMult) this.agi = Math.floor(this.agi * e.agiMult);
    if (e.fteBonus) this.fte += e.fteBonus;
    if (e.critBonus) this.critRate += e.critBonus;
    if (e.critDmgBonus) this.critDmg += e.critDmgBonus;
    if (e.dmgReduction) this.def = Math.floor(this.def * (1+e.dmgReduction));
    if (e.defMult) this.def = Math.floor(this.def * e.defMult);
    if (e.hitBonus) {} // applied in combat
    if (e.dropBonus) {} // applied in loot
    if (e.dropQuality) {} // applied in loot
    if (e.startRelic === 'legendary') {
      this.inventory.push('mist_heart');
    }
    this.san = this.maxSan;
    this.hp = this.maxHp;
    this.recalcStats();
  }

  // 应用途径效果
  applyPath(pathId) {
    const p = PATHS[pathId];
    this.path = pathId;
    this.maxSan = p.sanMax;
    if (p.intBonus) this.int += p.intBonus;
    if (p.conBonus) this.con += p.conBonus;
    if (p.prcBonus) this.prc += p.prcBonus;
    if (p.divBonus) this.div += p.divBonus;
    this.san = this.maxSan;
    this.recalcStats();
  }

  // 重算衍生属性
  recalcStats() {
    this.maxHp = Math.floor(80 + this.con * 5);
    if (this.talent?.effects?.hpMaxMult) this.maxHp = Math.floor(this.maxHp * this.talent.effects.hpMaxMult);
    this.hp = Math.min(this.hp, this.maxHp);
    
    this.atk = Math.floor(this.str * 2);
    this.def = Math.floor(this.con * 0.5);
    this.critRate = 0.05 + this.agi * 0.003 + this.fte * 0.002;
    this.dodgeRate = 0.05 + this.agi * 0.005;
    
    // 装备加成
    if (this.weapon) {
      const w = ITEMS[this.weapon];
      if (w?.effect?.atkBonus) this.atk += w.effect.atkBonus;
    }
    if (this.armor) {
      const a = ITEMS[this.armor];
      if (a?.effect?.defBonus) this.def += a.effect.defBonus;
    }
  }

  takeDamage(raw) {
    let dmg = Math.max(1, raw - this.def);
    // 天赋减伤
    if (this.talent?.effects?.dmgReduction) dmg = Math.floor(dmg * (1 - this.talent.effects.dmgReduction));
    // 闪避
    if (Math.random() < this.dodgeRate) return { dodged: true, dmg: 0 };
    this.hp = Math.max(0, this.hp - dmg);
    return { dodged: false, dmg };
  }

  loseSanity(amount) {
    // 遗物抗性
    if (this.relic) {
      const r = ITEMS[this.relic];
      if (r?.effect?.sanResist) amount = Math.floor(amount * (1 - r.effect.sanResist));
    }
    this.san = Math.max(0, this.san - amount);
    return this.san <= 0;
  }

  heal(amount) {
    if (this.talent?.effects?.noHeal) return 0;
    const actual = Math.min(this.maxHp - this.hp, amount);
    this.hp += actual;
    return actual;
  }

  restoreSan(amount) {
    const actual = Math.min(this.maxSan - this.san, amount);
    this.san += actual;
    return actual;
  }

  getDamageMultiplier() {
    let mult = 1.0;
    // 天赋：低HP增伤
    if (this.talent?.effects?.lowHpDmgMult && this.hp / this.maxHp < (this.talent.effects.lowHpThreshold || 0.3)) {
      mult *= this.talent.effects.lowHpDmgMult;
    }
    // 天赋：全局增伤
    if (this.talent?.effects?.dmgMult) mult *= this.talent.effects.dmgMult;
    // 兽化增伤
    if (this.beastFormTurns > 0) mult *= 2.0;
    return mult;
  }

  addItem(itemId) {
    this.inventory.push(itemId);
  }

  removeItem(itemId) {
    const idx = this.inventory.indexOf(itemId);
    if (idx >= 0) this.inventory.splice(idx, 1);
  }

  hasItem(itemId) {
    return this.inventory.includes(itemId);
  }

  equip(itemId) {
    const item = ITEMS[itemId];
    if (!item) return;
    if (item.type === 'weapon') { this.weapon = itemId; }
    else if (item.type === 'armor') { this.armor = itemId; }
    else if (item.type === 'relic') { this.relic = itemId; }
    this.recalcStats();
  }

  useItem(itemId) {
    const item = ITEMS[itemId];
    if (!item || item.type !== 'consumable') return false;
    if (item.effect.heal) this.heal(item.effect.heal);
    if (item.effect.sanRestore) this.restoreSan(item.effect.sanRestore);
    this.removeItem(itemId);
    return true;
  }
}

// ═══ 场景数据 ═══
const SCENES = {
  // ── 序章 ──
  prologue_start: {
    text: `你从昏迷中醒来。

周围是一片模糊的灰白色，浓雾像活物一样缠绕着你。你躺在冰冷的地面上，空气中弥漫着潮湿和腐朽的气味。

你的记忆一片空白。你不记得自己是谁，不记得为什么会在这里。

但有一件事很清楚——<span class="horror-text">你必须离开这里。</span>`,
    choices: [
      { text: '环顾四周，寻找线索', next: 'prologue_look_around' },
      { text: '检查自己的身体状况', next: 'prologue_check_self' },
    ]
  },

  prologue_check_self: {
    text: `你检查了一下自己。

身体似乎没有明显的伤口，但感到异常虚弱。衣服破烂不堪，沾满了泥土和某种暗色的污渍。

在口袋里，你摸到了一件冰凉的金属物件——一枚奇怪的护符，上面刻着看不懂的符文。护符散发着微弱的蓝光，似乎在保护你不受雾气的侵蚀。

<span class="talent-text">【你获得了遗物：未知护符】</span>`,
    onEnter: (g) => { g.state.addItem('unknown_amulet'); g.state.equip('unknown_amulet'); },
    choices: [
      { text: '收好护符，开始探索', next: 'prologue_look_around' },
    ]
  },

  prologue_look_around: {
    text: `你站起身来，环顾四周。

浓雾限制了视野，只能看清周围十几米。这里似乎是一条废弃的街道，两旁是破败的建筑。窗户都碎了，墙壁上爬满了黑色的藤蔓。

远处传来令人不安的声音——金属刮擦地面的刺耳声响，伴随着沉重的喘息。

你本能地感到<span class="horror-text">危险正在接近</span>。`,
    choices: [
      { text: '朝声音的方向前进', next: 'prologue_approach_sound' },
      { text: '远离声音，寻找安全路线', next: 'prologue_avoid_sound' },
    ]
  },

  prologue_approach_sound: {
    text: `你鼓起勇气，朝声音的方向前进。

转过街角，你看到了——

<span class="horror-text">一个蹒跚的身影正在街道上拖行。它曾是人类，但脊椎以不可能的角度弯曲，上半身几乎平行于地面。嘴永远张着，下颌脱臼，发出潮湿的喘息。</span>

它还没有发现你。`,
    onEnter: (g) => {
      g.sanityCheck(1, '那扭曲的身影让你感到恶心。');
      g.startCombat('wanderer');
    }
  },

  prologue_avoid_sound: {
    text: `你转身朝反方向走去。

但雾中传来了更多声音——来自四面八方。沉重的脚步声、喘息声、还有某种令人毛骨悚然的低语。

你被困住了。

<span class="horror-text">突然，一个蹒跚的身影从雾中冲了出来！</span>`,
    onEnter: (g) => {
      g.sanityCheck(2, '突然的袭击让你惊慌失措！');
      g.startCombat('wanderer');
    }
  },

  // ── 战斗胜利后 ──
  combat_victory: {
    text: `怪物倒下了，不再动弹。

你喘着粗气，看着地上的尸体。这是你在这个世界的第一次战斗，而你活了下来。

就在这时，你听到了脚步声——有节奏的、人类的脚步声。

"干得不错，新人。"

一个穿着破旧军装的老人走了出来，手中握着一把闪烁着微弱光芒的步枪。

"我是莫里斯，守夜人。看来你也是从雾里爬出来的幸存者。"

他打量了你一番。"你身上有种...特殊的气息。你感觉到了吗？那种力量正在觉醒。"`,
    choices: [
      { text: '"什么力量？"', next: 'path_intro' },
      { text: '"先告诉我这个世界发生了什么"', next: 'maurice_world' },
    ]
  },

  maurice_world: {
    text: `莫里斯叹了口气。

"雾灾已经持续了三年。没人知道它从哪来，只知道它改变了一切。"

他指了指周围的废墟。"这里曾经是繁华的城市。现在只剩下怪物和我们这些还在挣扎的人。"

"雾会侵蚀人的理智。你能在这里保持清醒，说明你有些特别。"

他的目光变得认真。"而且你身上有种力量正在觉醒。每个幸存者都会经历这个过程——我们称之为'超凡觉醒'。"

"你有四条路可以走。"`,
    choices: [
      { text: '"四条路？"', next: 'path_intro' },
    ]
  },

  // ── 途径选择 ──
  path_intro: {
    text: `莫里斯从口袋里掏出一本破旧的手册，翻开了几页。

"在这个世界里，有四种超凡途径。每条路都能让你变得强大，但每条路都有自己的代价。"

"知识途径——通过阅读禁忌书籍获取力量，但知道得越多，疯得越快。"

"诡异途径——变身成怪物获得战斗力，但变多了就再也变不回人了。"

"机械途径——改造身体或制造机械，但需要持续维护，而且会越来越不像人。"

"神选途径——被旧日支配者选中，获得神迹，但你不再是自己的主人。"

"选择你的道路吧。这将决定你的一切。"`,
    choices: [
      { text: '📖 知识途径 — 认知即污染', next: 'path_select_knowledge' },
      { text: '🐙 诡异途径 — 主动拥抱畸变', next: 'path_select_bizarre' },
      { text: '⚙️ 机械途径 — 抛弃血肉，驾驭钢铁', next: 'path_select_mechanism' },
      { text: '👁️ 神选途径 — 被高位存在选中', next: 'path_select_divine' },
    ]
  },

  path_select_knowledge: {
    text: `你选择了<span class="talent-text">知识途径</span>。

脑海中仿佛有一扇门被打开了。你开始注意到之前忽略的细节——墙壁上的符文、空气中微弱的能量波动、雾气的流动规律。

知识如潮水般涌入，但同时，你感到一丝不安。那些知识...它们在低语。

<span class="talent-text">【觉醒：知识途径·序列5】
【智力 +5】
【习得技能：真视之眼 / 精神冲击】</span>`,
    onEnter: (g) => { g.state.applyPath('knowledge'); },
    choices: [
      { text: '继续', next: 'talent_awakening' },
    ]
  },

  path_select_bizarre: {
    text: `你选择了<span class="horror-text">诡异途径</span>。

身体深处有什么东西在蠕动。像是被压抑了很久的野兽终于找到了出口。你的指甲开始变长，瞳孔中闪过一丝野性的光芒。

这种感觉...并不坏。甚至有些...<span class="horror-text">令人上瘾</span>。

<span class="talent-text">【觉醒：诡异途径·序列5】
【体质 +5】
【习得技能：兽化变身 / 撕裂爪击】</span>`,
    onEnter: (g) => { g.state.applyPath('bizarre'); },
    choices: [
      { text: '继续', next: 'talent_awakening' },
    ]
  },

  path_select_mechanism: {
    text: `你选择了<span class="talent-text">机械途径</span>。

你的感知变得异常敏锐——不是对生物，而是对机械。你能听到远处发电机的嗡鸣，感受到地下管道的振动。你的手指似乎在渴望工具和零件。

莫里斯递给你一个旧扳手。"拿着。机械途径的人，手里没工具会发疯的。"

<span class="talent-text">【觉醒：机械途径·序列5】
【感知 +5】
【习得技能：蒸汽喷射 / 部署炮台】</span>`,
    onEnter: (g) => { g.state.applyPath('mechanism'); },
    choices: [
      { text: '继续', next: 'talent_awakening' },
    ]
  },

  path_select_divine: {
    text: `你选择了<span class="horror-text">神选途径</span>。

你闭上眼，向虚空祈祷。

沉默。

然后——<span class="horror-text">有什么东西回应了你</span>。

不是声音，不是画面。是一种...注视。从某个无法理解的角度，某个远超人类认知的存在，将目光投向了你。

你的身体不由自主地颤抖。不是恐惧——是<span class="horror-text">被选中</span>的感觉。

<span class="talent-text">【觉醒：神选途径·序列5】
【神性 +5】
【习得技能：祈求神迹 / 神圣制裁】</span>`,
    onEnter: (g) => { g.state.applyPath('divine'); },
    choices: [
      { text: '继续', next: 'talent_awakening' },
    ]
  },

  // ── 天赋觉醒 ──
  talent_awakening: {
    text: `莫里斯看着你，眼中闪过一丝惊讶。

"等等...你身上的力量不只是途径觉醒。还有别的东西——一种天赋，一种与生俱来的特质。"

"让我看看..."`,
    onEnter: (g) => {
      const talent = rollTalent();
      g.state.applyTalent(talent);
      const gradeColor = {S:'#ff4444',A:'#d4af37',B:'#4a90e2',C:'#88cc88',D:'#aaaaaa'}[talent.grade];
      const typeTag = talent.type === '纯正向·欧皇' ? '<span style="color:#d4af37">【纯正向·欧皇】</span>' : '';
      
      g.appendStory(`\n<span style="color:${gradeColor};font-weight:bold;font-size:18px;">
═══════════════════════════
【天赋觉醒：${talent.name}】
【等级：${talent.grade}级】${typeTag}
═══════════════════════════</span>

${talent.manifesto}

<span class="talent-text">【能力】${talent.desc}</span>`);
    },
    choices: [
      { text: '接受这份天赋', next: 'maurice_invite' },
    ]
  },

  // ── 莫里斯邀请 ──
  maurice_invite: {
    text: `莫里斯点了点头。"天赋已觉醒，途径已选择。你现在是一个真正的超凡者了。"

"跟我来吧。我在附近有个安全屋——废弃的地铁站。那里有篝火，有其他幸存者。"

"记住一件事——<span class="horror-text">别相信雾里的任何人</span>。"

你们开始在废墟中穿行。走了约二十分钟，来到一处地铁站入口。楼梯向下延伸，消失在黑暗中，但你能看到下方有微弱的火光。

"欢迎来到'灰烬走廊'。"

就在这时——

远处传来一声震耳欲聋的咆哮，地面在颤抖。雾的浓度急剧上升。

"该死！<span class="horror-text">雾潮！大型畸变体正在接近！</span>"

莫里斯抓住你的肩膀。"快进去！我会挡住它！"

他转身冲进了雾中。

你站在地铁站入口，听着枪声和咆哮声渐渐远去...`,
    choices: [
      { text: '进入地铁站', next: 'chapter1_hub' },
    ]
  },

  // ── 第一章：灰烬走廊 ──
  chapter1_hub: {
    text: `你走下楼梯，来到了地铁站。

这里被改造成了一个简陋但温暖的据点。几盏油灯散发着昏黄的光芒，墙角燃着一堆篝火。大约十几个幸存者散布在各处——有人在休息，有人在修理装备，有人在低声交谈。

一个年轻女人走过来。"你是莫里斯带回来的？他...还没回来？"

她的表情变得黯淡，但很快恢复了。"我是艾琳，这里的临时负责人。先去篝火旁休息一下吧。"

<span class="talent-text">【第一章：灰烬走廊】</span>

你可以在据点中自由活动：`,
    choices: [
      { text: '🔥 在篝火旁休息（恢复HP和SAN）', next: 'hub_rest' },
      { text: '🛒 去商人处购买物资', next: 'hub_shop' },
      { text: '📦 整理背包', next: 'hub_inventory' },
      { text: '🗡️ 外出探索（危险）', next: 'hub_explore' },
    ]
  },

  hub_rest: {
    text: `你坐在篝火旁，火焰的温暖让你紧绷的神经稍微放松了一些。

火光在墙壁上投下跳动的影子。你闭上眼睛，感受着热量渗入疲惫的身体。

<span class="talent-text">【篝火休息】
生命值恢复至上限
理智值恢复至上限的80%</span>

你感觉好多了。但篝火的光芒似乎在逐渐变暗...`,
    onEnter: (g) => {
      g.state.hp = g.state.maxHp;
      g.state.san = Math.min(g.state.maxSan, Math.floor(g.state.maxSan * 0.8));
    },
    choices: [
      { text: '返回据点', next: 'chapter1_hub' },
    ]
  },

  hub_shop: {
    text: `一个戴着护目镜的中年男人坐在角落，面前摆着各种物资。

"新面孔啊。看看吧，都是好东西。价格公道。"

<span class="talent-text">【商人·老杰克】
你的金币：${'{gold}'}</span>`,
    isDynamic: true,
    getChoices: (g) => {
      const choices = [
        { text: `生命药剂 (30金) — 恢复30HP`, action: 'buy', item: 'health_potion', cost: 30 },
        { text: `理智药剂 (50金) — 恢复20SAN`, action: 'buy', item: 'san_potion', cost: 50 },
        { text: `铁刃长剑 (80金) — 攻击+15`, action: 'buy', item: 'iron_blade', cost: 80 },
        { text: `锁子甲 (100金) — 防御+12`, action: 'buy', item: 'chain_mail', cost: 100 },
        { text: '返回据点', next: 'chapter1_hub' },
      ];
      return choices;
    }
  },

  hub_inventory: {
    text: `你打开了背包。`,
    isDynamic: true,
    getChoices: (g) => {
      const choices = [];
      const items = {};
      g.state.inventory.forEach(id => { items[id] = (items[id]||0)+1; });
      
      for (const [id, count] of Object.entries(items)) {
        const item = ITEMS[id];
        if (!item) continue;
        if (item.type === 'consumable') {
          choices.push({ text: `使用 ${item.name} ×${count} — ${item.desc}`, action:'use', item:id });
        } else {
          const equipped = (g.state.weapon===id||g.state.armor===id||g.state.relic===id) ? ' [已装备]' : '';
          choices.push({ text: `${item.name} ×${count}${equipped} — ${item.desc}`, action:'equip', item:id });
        }
      }
      choices.push({ text: '返回据点', next: 'chapter1_hub' });
      return choices;
    }
  },

  hub_explore: {
    text: `你决定离开安全的据点，重新走入迷雾中。

外面的雾比之前更浓了。能见度不到十米。

你沿着废弃的街道前进，脚步声在空旷的城市中回荡...`,
    getChoices: (g) => {
      const encounters = ['explore_combat','explore_combat','explore_find','explore_combat','explore_event'];
      return [
        { text: '继续前进', next: encounters[Math.floor(Math.random()*encounters.length)] },
        { text: '返回据点', next: 'chapter1_hub' },
      ];
    }
  },

  explore_combat: {
    text: `雾中出现了敌人的身影！`,
    onEnter: (g) => {
      const pool = ['wanderer','rat_swarm','whisper_moth','rust_golem','shadow_crawler'];
      const weights = [0.3, 0.25, 0.2, 0.15, 0.1];
      let r = Math.random(), cum = 0, eid = 'wanderer';
      for (let i=0; i<pool.length; i++) {
        cum += weights[i];
        if (r < cum) { eid = pool[i]; break; }
      }
      const enemy = ENEMIES[eid];
      g.appendStory(`\n<span class="horror-text">【遭遇：${enemy.name}】</span>\n${enemy.desc}`);
      g.sanityCheck(enemy.horror, `${enemy.name}的出现让你感到不安。`);
      g.startCombat(eid);
    }
  },

  explore_find: {
    text: `你在废墟中发现了一些有价值的东西。`,
    onEnter: (g) => {
      const finds = [
        { item:'health_potion', text:'一瓶生命药剂' },
        { item:'san_potion', text:'一瓶理智药剂' },
        { item:'rusty_sword', text:'一把锈蚀的短剑' },
      ];
      const gold = Math.floor(Math.random()*30)+10;
      const find = finds[Math.floor(Math.random()*finds.length)];
      g.state.addItem(find.item);
      g.state.gold += gold;
      g.appendStory(`\n<span class="talent-text">【发现】${find.text}，${gold}金币</span>`);
    },
    choices: [
      { text: '继续探索', next: 'hub_explore' },
      { text: '返回据点', next: 'chapter1_hub' },
    ]
  },

  explore_event: {
    text: `你在雾中发现了一个奇怪的场景。

一具守夜人的尸体靠在墙边，手中紧握着一本日记。他的表情平静，但双眼已经变成了纯白色。

日记的最后一页写着：

<span class="horror-text">"雾不是天灾。它是被召唤来的。
守夜人不是守护者——我们是牧羊人。
而人类...是羊群。"</span>

<span class="talent-text">【真相碎片 #1 获得】</span>`,
    onEnter: (g) => {
      g.state.flags.truth1 = true;
      g.state.loseSanity(10);
    },
    choices: [
      { text: '收好日记，返回据点', next: 'chapter1_hub' },
    ]
  },

  // ── Boss战 ──
  boss_intro: {
    text: `当你回到据点时，发现所有人都惊恐地看向地铁站入口。

雾从入口处涌入，浓得不像话。篝火的火焰在剧烈摇晃。

然后你看到了它——

<span class="horror-text">迷雾凝聚成一个三米高的人形，缓缓走下楼梯。它没有面孔，只有一个不断旋转的漩涡。

"雾中之主"——深渊裂缝的守护者。</span>

<span class="horror-text">【Boss战：雾中之主】
【恐怖等级：5 - 极度恐怖】</span>`,
    onEnter: (g) => {
      g.sanityCheck(5, '雾中之主的存在让你的理智剧烈震荡！');
      g.startCombat('mist_lord');
    }
  },

  boss_victory: {
    text: `雾中之主的形体在最后一击中崩解，化为无数雾粒消散在空气中。

地上留下了一颗散发着幽蓝光芒的结晶——<span class="talent-text">雾之心</span>。

你捡起它，感受到一股强大而危险的力量在掌心脉动。

<span class="talent-text">【获得超凡遗物：雾之心】
【Boss战胜利！大量经验值和金币！】</span>

据点的幸存者们从藏身处走出来，用敬畏的目光看着你。

艾琳走过来："你...你击败了它？一个人？"

她深吸一口气。"也许莫里斯说得对。你不只是一个普通的幸存者。"

<span class="horror-text">【第一章完】
【第二章：深渊低语 — 即将开放】

感谢游玩《遗物纪元》原型 v0.2！</span>`,
    onEnter: (g) => {
      g.state.addItem('mist_heart');
      g.state.gold += 200;
    },
    choices: [
      { text: '重新开始', action: 'restart' },
    ]
  },

  restart: {
    text: '',
    onEnter: () => { location.reload(); }
  },

  // ── 死亡 ──
  death_scene: {
    text: `你倒下了。

视线变得模糊，意识在消散。最后看到的是浓雾中那双注视你的眼睛——或者说，无数个眼睛。

<span class="horror-text">"死亡不是解脱。死亡是新一轮折磨的开始。"</span>

<span class="talent-text">【亡者回响】
你死亡了。所有未绑定的遗物和物品掉落在死亡地点。
复活时全属性临时降低20%。
死亡地点生成"灵魂墓碑"，触碰可回收掉落物。</span>`,
    choices: [
      { text: '在篝火旁重生', action: 'respawn' },
    ]
  },

  // ── 理智崩溃 ──
  sanity_collapse: {
    text: `你的理智终于崩溃了。

不是戏剧性的爆发，而是缓慢的、无声的消散。就像雾一样，你的意识一点点被侵蚀，直到什么都不剩。

<span class="horror-text">你不再知道自己在哪，不再知道自己是谁。

也许你还在行走。也许你还在说话。也许你成为了另一个在雾中游荡的畸变体。

但"你"已经不在了。</span>

<span class="horror-text">【理智归零 — 精神崩溃】
【游戏结束】</span>`,
    choices: [
      { text: '重新开始', action: 'restart' },
    ]
  }
};

// ═══ 游戏引擎 ═══
class Game {
  constructor() {
    this.state = new GameState();
    this.combatLog = [];
    this.enemy = null;
    this.inCombat = false;
    this.combatTurn = 0;
    this.init();
  }

  init() {
    document.getElementById('start-btn').addEventListener('click', () => this.startGame());
    document.querySelectorAll('.combat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleCombatAction(e.target.dataset.action));
    });
    // 道具按钮 (预留)
    document.addEventListener('click', (e) => {
      if (e.target.dataset.itemAction) {
        if (typeof this.handleItemAction === 'function') {
          this.handleItemAction(e.target.dataset.itemAction, e.target.dataset.item);
        }
      }
    });
  }

  startGame() {
    try {
      document.getElementById('start-screen').classList.add('hidden');
      document.getElementById('combat-ui').classList.add('hidden');
      document.getElementById('main-content').style.display = 'flex';
      this.state.updateUI();
      this.loadScene('prologue_start');
    } catch(e) {
      console.error('startGame error:', e);
      document.getElementById('story-text').innerHTML = '<span style="color:red">游戏加载出错: ' + e.message + '</span>';
    }
  }

  loadScene(sceneId) {
    try {
    if (sceneId === 'restart') { location.reload(); return; }
    
    const scene = SCENES[sceneId];
    if (!scene) { console.error('Scene not found:', sceneId); return; }

    // 隐藏战斗UI
    if (!this.inCombat) {
      document.getElementById('combat-ui').classList.add('hidden');
      document.getElementById('main-content').style.display = 'flex';
      document.getElementById('main-content').style.flexDirection = 'column';
    }

    // 显示文本
    const storyEl = document.getElementById('story-text');
    let text = scene.text;
    // 动态替换
    text = text.replace('{gold}', this.state.gold);
    storyEl.innerHTML = text;

    // onEnter
    if (scene.onEnter) scene.onEnter(this);

    // 选项
    let choices;
    if (scene.isDynamic && scene.getChoices) {
      choices = scene.getChoices(this);
    } else {
      choices = scene.choices || [];
    }

    if (!this.inCombat) {
      this.showChoices(choices);
    }
    } catch(err) {
      console.error('loadScene error:', sceneId, err);
      const storyEl = document.getElementById('story-text');
      storyEl.innerHTML += '<p style="color:#ff4444">[场景加载出错: ' + err.message + ']</p>';
    }
  }

  appendStory(html) {
    document.getElementById('story-text').innerHTML += html;
  }

  showChoices(choices) {
    const container = document.getElementById('choices-container');
    container.innerHTML = '';
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.addEventListener('click', () => {
        if (choice.action === 'restart') { location.reload(); return; }
        if (choice.action === 'respawn') { this.respawn(); return; }
        if (choice.action === 'buy') { this.buyItem(choice.item, choice.cost); return; }
        if (choice.action === 'use') { this.useItemFromMenu(choice.item); return; }
        if (choice.action === 'equip') { this.equipFromMenu(choice.item); return; }
        if (choice.next) this.loadScene(choice.next);
      });
      container.appendChild(btn);
    });
  }

  buyItem(itemId, cost) {
    if (this.state.gold >= cost) {
      this.state.gold -= cost;
      this.state.addItem(itemId);
      this.appendStory(`\n<span class="talent-text">购买了 ${ITEMS[itemId].name}</span>`);
      // 刷新商店
      this.loadScene('hub_shop');
    } else {
      this.appendStory(`\n<span class="horror-text">金币不足！</span>`);
    }
  }

  useItemFromMenu(itemId) {
    const item = ITEMS[itemId];
    if (this.state.useItem(itemId)) {
      this.appendStory(`\n<span class="talent-text">使用了 ${item.name}</span>`);
      this.state.updateUI();
      this.loadScene('hub_inventory');
    }
  }

  equipFromMenu(itemId) {
    this.state.equip(itemId);
    this.appendStory(`\n<span class="talent-text">装备了 ${ITEMS[itemId].name}</span>`);
    this.state.updateUI();
    this.loadScene('hub_inventory');
  }

  respawn() {
    this.state.deathCount++;
    this.state.hp = this.state.maxHp;
    this.state.san = Math.floor(this.state.maxSan * 0.5);
    this.state.str = Math.max(1, this.state.str - 2);
    this.state.agi = Math.max(1, this.state.agi - 2);
    this.state.con = Math.max(1, this.state.con - 2);
    this.state.recalcStats();
    this.state.updateUI();
    this.loadScene('chapter1_hub');
  }

  // ── 理智检定 ──
  sanityCheck(horrorLevel, failText) {
    const check = this.state.san + this.state.fte * 2 + Math.random() * 20;
    const threshold = horrorLevel * 10;
    
    if (check < threshold - 20) {
      const loss = Math.floor(this.state.san * 0.5);
      this.state.loseSanity(loss);
      this.addLog(`【理智检定：大失败】${failText} SAN -${loss}`, 'system');
    } else if (check < threshold) {
      const loss = Math.floor(this.state.san * 0.3) || 5;
      this.state.loseSanity(loss);
      this.addLog(`【理智检定：失败】${failText} SAN -${loss}`, 'system');
    } else {
      this.state.loseSanity(3);
      this.addLog('【理智检定：通过】你强忍着不适。SAN -3', 'system');
    }

    // 检查理智崩溃
    if (this.state.san <= 0) {
      this.inCombat = false;
      setTimeout(() => this.loadScene('sanity_collapse'), 500);
    }

    this.state.updateUI();
  }

  // ── 战斗系统 ──
  startCombat(enemyId) {
    const ed = ENEMIES[enemyId];
    this.enemy = { ...ed, id: enemyId, currentPhase: 0 };
    this.inCombat = true;
    this.combatTurn = 0;
    this.combatLog = [];
    this.state.turretActive = false;
    this.state.beastFormTurns = 0;

    document.getElementById('combat-ui').classList.remove('hidden');
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('enemy-name').textContent = ed.name + (ed.isBoss ? ' 【BOSS】' : '');
    this.updateEnemyHp();
    document.getElementById('enemy-horror').textContent = ed.horror;

    this.addLog(`═══ 战斗开始 ═══`, 'system');
    this.addLog(`${ed.desc}`, 'system');
    this.updateCombatLog();
    this.enableCombatButtons(true);
  }

  handleCombatAction(action) {
    if (!this.inCombat || !this.enemy) return;
    this.combatTurn++;
    this.enableCombatButtons(false);

    let playerDmg = 0;
    const e = this.enemy;

    switch (action) {
      case 'attack': {
        playerDmg = Math.floor(this.state.atk * (0.8 + Math.random()*0.4) * this.state.getDamageMultiplier());
        const isCrit = Math.random() < this.state.critRate;
        if (isCrit) { playerDmg = Math.floor(playerDmg * this.state.critDmg); }
        // 天赋：穿甲
        if (this.talent?.effects?.armorPen) playerDmg = Math.floor(playerDmg * 1.3);
        e.hp -= playerDmg;
        this.addLog(`你攻击了${e.name}，造成 ${playerDmg} 伤害${isCrit?' (暴击！)':''}`, 'player-action');
        // 天赋：自伤
        if (this.talent?.effects?.selfDmgOnHit) {
          this.state.hp -= this.talent.effects.selfDmgOnHit;
          this.addLog(`骨骼反噬：-${this.talent.effects.selfDmgOnHit} HP`, 'system');
        }
        break;
      }

      case 'defend': {
        this.addLog('你采取防御姿态，本回合伤害减半。', 'player-action');
        this.state.flags.defending = true;
        break;
      }

      case 'skill': {
        this.usePathSkill();
        break;
      }

      case 'item': {
        this.showCombatItems();
        return; // 不结束回合
      }

      case 'flee': {
        if (e.isBoss) {
          this.addLog('无法从Boss战中逃跑！', 'system');
          this.enableCombatButtons(true);
          return;
        }
        if (Math.random() > 0.4) {
          this.addLog('你成功逃离了战斗！', 'system');
          this.inCombat = false;
          setTimeout(() => this.loadScene('chapter1_hub'), 800);
          return;
        } else {
          this.addLog('逃跑失败！', 'system');
        }
        break;
      }
    }

    // 检查敌人是否死亡
    if (e.hp <= 0) {
      this.combatVictory();
      return;
    }

    // Boss阶段检查
    if (e.isBoss && e.phases) {
      const hpRatio = e.hp / e.maxHp;
      for (let i = e.phases.length-1; i >= 0; i--) {
        if (hpRatio <= e.phases[i].hpThreshold && e.currentPhase < i+1) {
          e.currentPhase = i+1;
          this.addLog(`═══ ${e.phases[i].name} ═══`, 'system');
          // Boss阶段转换增伤
          e.dmg = Math.floor(e.dmg * 1.3);
        }
      }
    }

    // 炮台自动攻击
    if (this.state.turretActive) {
      const turretDmg = Math.floor(this.state.prc * 1.5);
      e.hp -= turretDmg;
      this.addLog(`自动炮台射击，造成 ${turretDmg} 伤害`, 'player-action');
      if (e.hp <= 0) { this.combatVictory(); return; }
    }

    // 敌人回合
    setTimeout(() => this.enemyTurn(), 400);
  }

  enemyTurn() {
    const e = this.enemy;
    
    // 敌人攻击
    let rawDmg = Math.floor(e.dmg * (0.8 + Math.random()*0.4));
    
    // Boss特殊攻击
    if (e.isBoss && Math.random() < 0.3) {
      rawDmg = Math.floor(rawDmg * 1.5);
      this.addLog(`${e.name}释放了强力攻击！`, 'enemy-action');
      this.state.loseSanity(5);
    }

    const result = this.state.takeDamage(rawDmg);
    
    if (this.state.flags.defending) {
      result.dmg = Math.floor(result.dmg * 0.5);
      this.state.flags.defending = false;
    }

    if (result.dodged) {
      this.addLog(`${e.name}攻击了你——你闪避了！`, 'enemy-action');
    } else {
      this.addLog(`${e.name}攻击了你，造成 ${result.dmg} 伤害`, 'enemy-action');
    }

    // 天赋：反伤
    if (!result.dodged && this.talent?.effects?.corrosionDmg) {
      const corr = Math.floor(e.maxHp * this.talent.effects.corrosionDmg);
      e.hp -= corr;
      this.addLog(`腐蚀反噬：${e.name}受到 ${corr} 腐蚀伤害`, 'player-action');
      if (e.hp <= 0) { this.combatVictory(); return; }
    }

    // SAN持续流失（Boss光环）
    if (e.isBoss) {
      this.state.loseSanity(3);
      this.addLog('雾中之主的存在让你的理智持续流失 SAN -3', 'system');
    }

    // 兽化倒计时
    if (this.state.beastFormTurns > 0) {
      this.state.beastFormTurns--;
      if (this.state.beastFormTurns === 0) {
        this.addLog('兽化变身结束，恢复人形。', 'system');
      }
    }

    // 检查死亡
    if (this.state.hp <= 0) {
      this.addLog('你倒下了...', 'system');
      this.inCombat = false;
      setTimeout(() => this.loadScene('death_scene'), 1000);
      return;
    }
    if (this.state.san <= 0) {
      this.inCombat = false;
      setTimeout(() => this.loadScene('sanity_collapse'), 1000);
      return;
    }

    this.state.updateUI();
    this.updateEnemyHp();
    this.updateCombatLog();
    this.enableCombatButtons(true);
  }

  usePathSkill() {
    const path = this.state.path;
    const skills = PATHS[path]?.skills || [];
    
    // 简化：使用第一个技能
    if (skills.length === 0) {
      this.addLog('你还没有学习任何技能！', 'system');
      this.enableCombatButtons(true);
      return;
    }

    // 显示技能选择
    const container = document.getElementById('choices-container');
    document.getElementById('combat-ui').classList.add('hidden');
    document.getElementById('main-content').style.display = '';

    const skillChoices = skills.map((s, i) => ({
      text: `${s.name} (SAN消耗:${s.cost}) — ${s.desc}`,
      action: 'skill', skillIdx: i
    }));
    skillChoices.push({ text: '取消', action: 'cancel' });
    this.showChoices(skillChoices);

    // 临时覆盖选项点击
    container.querySelectorAll('.choice-btn').forEach((btn, i) => {
      btn.onclick = () => {
        const choice = skillChoices[i];
        if (choice.action === 'cancel') {
          this.loadCombatUI();
          this.enableCombatButtons(true);
          return;
        }
        this.executeSkill(choice.skillIdx);
      };
    });
  }

  executeSkill(idx) {
    const skills = PATHS[this.state.path]?.skills || [];
    const skill = skills[idx];
    if (!skill) return;

    const e = this.enemy;
    
    // 消耗SAN
    if (skill.cost > 0) {
      this.state.loseSanity(skill.cost);
      this.addLog(`使用 ${skill.name}，SAN -${skill.cost}`, 'system');
    }

    switch (skill.effect) {
      case 'critBoost':
        this.state.critRate += 0.5;
        this.addLog(`真视之眼启动！暴击率大幅提升！`, 'player-action');
        break;
      case 'mindBlast': {
        const dmg = Math.floor(this.state.int * 2 * this.state.getDamageMultiplier());
        e.hp -= dmg;
        this.addLog(`精神冲击！造成 ${dmg} 精神伤害！`, 'player-action');
        break;
      }
      case 'beastForm':
        this.state.beastFormTurns = 3;
        this.addLog(`兽化变身！STR翻倍，持续3回合！`, 'player-action');
        break;
      case 'rendClaw': {
        let total = 0;
        for (let i = 0; i < 3; i++) {
          const d = Math.floor(this.state.atk * 0.5 * this.state.getDamageMultiplier());
          e.hp -= d;
          total += d;
        }
        this.addLog(`撕裂爪击！三连击造成总计 ${total} 伤害！`, 'player-action');
        break;
      }
      case 'steamBlast': {
        const dmg = Math.floor(this.state.prc * 1.5 * this.state.getDamageMultiplier());
        e.hp -= dmg;
        this.addLog(`蒸汽喷射！造成 ${dmg} 伤害并击退！`, 'player-action');
        break;
      }
      case 'deployTurret':
        this.state.turretActive = true;
        this.addLog(`部署自动炮台！每回合自动攻击！`, 'player-action');
        break;
      case 'prayMiracle': {
        if (Math.random() < 0.5) {
          const dmg = Math.floor(e.maxHp * 0.3);
          e.hp -= dmg;
          this.addLog(`神迹降临！天降光柱造成 ${dmg} 伤害！`, 'player-action');
        } else {
          this.addLog(`祈祷没有得到回应...神沉默了。`, 'system');
        }
        break;
      }
      case 'holySmite': {
        const dmg = Math.floor((this.state.div + 5) * 3 * this.state.getDamageMultiplier());
        e.hp -= dmg;
        this.addLog(`神圣制裁！降下光柱造成 ${dmg} 真实伤害！`, 'player-action');
        break;
      }
    }

    if (e.hp <= 0) {
      this.loadCombatUI();
      this.combatVictory();
      return;
    }

    this.state.updateUI();
    this.loadCombatUI();
    setTimeout(() => this.enemyTurn(), 400);
  }

  showCombatItems() {
    const consumables = this.state.inventory.filter(id => ITEMS[id]?.type === 'consumable');
    const container = document.getElementById('choices-container');
    
    document.getElementById('combat-ui').classList.add('hidden');
    document.getElementById('main-content').style.display = '';

    const choices = consumables.map(id => ({
      text: `使用 ${ITEMS[id].name} — ${ITEMS[id].desc}`,
      action: 'use_combat', item: id
    }));
    choices.push({ text: '取消', action: 'cancel' });
    this.showChoices(choices);

    container.querySelectorAll('.choice-btn').forEach((btn, i) => {
      btn.onclick = () => {
        if (choices[i].action === 'cancel') {
          this.loadCombatUI();
          this.enableCombatButtons(true);
          return;
        }
        this.state.useItem(choices[i].item);
        this.addLog(`使用了 ${ITEMS[choices[i].item].name}`, 'player-action');
        this.state.updateUI();
        this.loadCombatUI();
        setTimeout(() => this.enemyTurn(), 400);
      };
    });
  }

  loadCombatUI() {
    document.getElementById('combat-ui').classList.remove('hidden');
    document.getElementById('main-content').style.display = 'none';
  }

  combatVictory() {
    const e = this.enemy;
    this.addLog(`═══ ${e.name} 被击败！ ═══`, 'system');
    
    // 掉落
    this.state.gold += Math.floor(Math.random() * 20) + 10;
    this.state.killCount++;
    
    if (e.loot) {
      e.loot.forEach(item => {
        if (ITEMS[item]) {
          this.state.addItem(item);
          this.addLog(`获得：${ITEMS[item].name}`, 'system');
        }
      });
    }

    // 天赋：掉落加成
    if (this.talent?.effects?.dropBonus) {
      this.state.gold += 10;
      this.addLog('天赋加成：额外金币 +10', 'system');
    }

    this.inCombat = false;
    this.state.updateUI();
    this.updateCombatLog();

    setTimeout(() => {
      document.getElementById('combat-ui').classList.add('hidden');
      document.getElementById('main-content').style.display = '';
      if (e.isBoss) {
        this.loadScene('boss_victory');
      } else {
        this.loadScene('combat_victory');
      }
    }, 1500);
  }

  enableCombatButtons(enabled) {
    document.querySelectorAll('.combat-btn').forEach(btn => btn.disabled = !enabled);
  }

  addLog(msg, type='') {
    this.combatLog.push({msg, type});
    this.updateCombatLog();
  }

  updateCombatLog() {
    const el = document.getElementById('combat-log');
    el.innerHTML = this.combatLog.map(e => `<div class="log-entry ${e.type}">${e.msg}</div>`).join('');
    el.scrollTop = el.scrollHeight;
  }

  updateEnemyHp() {
    document.getElementById('enemy-hp').textContent = `${Math.max(0,this.enemy.hp)}/${this.enemy.maxHp}`;
  }
}

// 天赋引用
Object.defineProperty(Game.prototype, 'talent', {
  get() { return this.state.talent; }
});

// 启动
const game = new Game();
