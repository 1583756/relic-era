// 遗物纪元 - 游戏核心逻辑

class GameState {
    constructor() {
        this.hp = 100;
        this.maxHp = 100;
        this.san = 100;
        this.maxSan = 100;
        this.talent = null;
        this.inventory = [];
        this.flags = {};
        this.currentScene = 'prologue_start';
        this.inCombat = false;
        this.enemy = null;
    }

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        this.updateUI();
        return this.hp <= 0;
    }

    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
        this.updateUI();
    }

    loseSanity(amount) {
        this.san = Math.max(0, this.san - amount);
        this.updateUI();
        
        if (this.san <= 20) {
            this.showSanityWarning();
        }
        
        return this.san <= 0;
    }

    restoreSanity(amount) {
        this.san = Math.min(this.maxSan, this.san + amount);
        this.updateUI();
    }

    updateUI() {
        document.getElementById('hp-value').textContent = `${this.hp}/${this.maxHp}`;
        document.getElementById('san-value').textContent = `${this.san}/${this.maxSan}`;
        document.getElementById('talent-value').textContent = this.talent || '未觉醒';
    }

    showSanityWarning() {
        const storyText = document.getElementById('story-text');
        const warning = document.createElement('p');
        warning.className = 'sanity-warning';
        warning.textContent = '【你的理智正在崩溃的边缘...】';
        storyText.appendChild(warning);
    }
}

// 天赋系统 - 从200个天赋中简化抽取
const talents = [
    {
        name: '铁胃',
        grade: 'C',
        description: '你可以食用腐烂的食物而不受惩罚',
        effect: 'food_safe'
    },
    {
        name: '夜视',
        grade: 'C',
        description: '在黑暗中视野不受影响',
        effect: 'night_vision'
    },
    {
        name: '第六感',
        grade: 'B',
        description: '能够感知到隐藏的危险',
        effect: 'danger_sense'
    },
    {
        name: '快速恢复',
        grade: 'B',
        description: '生命值和理智值恢复速度提升',
        effect: 'fast_recovery'
    },
    {
        name: '命运眷顾',
        grade: 'A',
        description: '幸运值大幅提升，暴击率增加',
        effect: 'lucky'
    }
];

// 怪物数据
const enemies = {
    wanderer: {
        name: '蹒跚者',
        hp: 40,
        maxHp: 40,
        horror: 1,
        damage: 8,
        description: '一个曾经的市民，现在拖着扭曲的身体在雾中游荡',
        sanLoss: 5
    },
    rat_swarm: {
        name: '雾鼠群',
        hp: 30,
        maxHp: 30,
        horror: 2,
        damage: 12,
        description: '一群变异的巨鼠，眼睛闪烁着不正常的光芒',
        sanLoss: 8
    }
};

// 场景数据
const scenes = {
    prologue_start: {
        text: `你从昏迷中醒来。

周围是一片模糊的灰白色，浓雾像活物一样缠绕着你。你躺在冰冷的地面上，空气中弥漫着潮湿和腐朽的气味。

你的记忆一片空白。你不记得自己是谁，不记得为什么会在这里。

但有一件事很清楚——你必须离开这里。`,
        choices: [
            {
                text: '环顾四周，寻找线索',
                next: 'prologue_look_around'
            },
            {
                text: '检查自己的身体状况',
                next: 'prologue_check_self'
            }
        ]
    },

    prologue_check_self: {
        text: `你检查了一下自己。

身体似乎没有明显的伤口，但感到异常虚弱。你的衣服破烂不堪，沾满了泥土和某种暗色的污渍。

在你的口袋里，你摸到了一件冰凉的金属物件——一枚奇怪的护符，上面刻着你看不懂的符文。护符散发着微弱的蓝光，似乎在保护你不受雾气的侵蚀。`,
        choices: [
            {
                text: '仔细观察护符',
                next: 'prologue_amulet'
            },
            {
                text: '收起护符，开始探索周围',
                next: 'prologue_look_around'
            }
        ]
    },

    prologue_amulet: {
        text: `你举起护符仔细观察。

符文在蓝光中若隐若现，像是某种古老的文字。当你注视它时，脑海中突然闪过一个词——"遗物"。

这是你的遗物。虽然你不记得它的来历，但直觉告诉你，这件物品对你至关重要。

【你获得了遗物：未知护符】`,
        onEnter: (game) => {
            game.state.inventory.push('unknown_amulet');
        },
        choices: [
            {
                text: '收好护符，开始探索',
                next: 'prologue_look_around'
            }
        ]
    },

    prologue_look_around: {
        text: `你站起身来，环顾四周。

浓雾限制了你的视野，只能看清周围十几米的范围。这里似乎是一条废弃的街道，两旁是破败的建筑。建筑物的窗户都碎了，墙壁上爬满了某种黑色的藤蔓。

远处传来令人不安的声音——像是金属刮擦地面的刺耳声响，还伴随着沉重的喘息。

你本能地感到危险正在接近。`,
        choices: [
            {
                text: '朝声音的方向前进，看看是什么',
                next: 'prologue_approach_sound'
            },
            {
                text: '远离声音，寻找安全的路线',
                next: 'prologue_avoid_sound'
            }
        ]
    },

    prologue_approach_sound: {
        text: `你鼓起勇气，朝声音的方向前进。

转过一个街角，你看到了声音的来源——

<span class="horror-text">一个蹒跚的身影正在街道上拖行。</span>

它曾经是一个人类，但现在脊椎以不自然的角度弯曲，上半身几乎平行于地面。它的嘴永远张着，下颌脱臼，发出潮湿的喘息声。

它还没有发现你。

【遭遇战：蹒跚者】
【恐怖等级：1 - 轻微不安】
【理智检定：你的理智值将受到考验】`,
        onEnter: (game) => {
            // 理智检定
            const check = game.state.san + Math.random() * 20;
            const threshold = 15; // 恐怖等级 * 2
            
            if (check < threshold) {
                game.state.loseSanity(15);
                game.addLog('【理智检定失败】那扭曲的身影让你感到恶心和恐惧。', 'system');
            } else {
                game.state.loseSanity(5);
                game.addLog('【理智检定通过】你强忍着不适，握紧了拳头。', 'system');
            }
            
            // 开始战斗
            game.startCombat('wanderer');
        }
    },

    prologue_avoid_sound: {
        text: `你决定避开危险，转身朝相反的方向走去。

但你刚走了几步，就意识到雾中传来了更多的声音——来自四面八方。沉重的脚步声、喘息声、还有某种令人毛骨悚然的低语。

你被困住了。

突然，一个蹒跚的身影从雾中冲了出来！

【遭遇战：蹒跚者】
【恐怖等级：1 - 轻微不安】
【理智检定：你的理智值将受到考验】`,
        onEnter: (game) => {
            // 被伏击，理智检定更难
            const check = game.state.san + Math.random() * 20;
            const threshold = 20;
            
            if (check < threshold) {
                game.state.loseSanity(20);
                game.addLog('【理智检定失败】突然的袭击让你惊慌失措！', 'system');
            } else {
                game.state.loseSanity(8);
                game.addLog('【理智检定通过】虽然被吓了一跳，但你迅速镇定下来。', 'system');
            }
            
            game.startCombat('wanderer');
        }
    },

    combat_victory: {
        text: `蹒跚者倒下了，不再动弹。

你喘着粗气，看着地上的尸体。这是你在这个世界的第一次战斗，而你活了下来。

但你知道，这只是开始。雾中还有更多的怪物，更恐怖的存在。

就在这时，你听到了脚步声——但这次不同，是有节奏的、人类的脚步声。

"干得不错，新人。"

一个苍老但有力的声音从雾中传来。一个穿着破旧军装的老人走了出来，手中握着一把闪烁着微弱光芒的步枪。

"我是莫里斯，守夜人。看来你也是从雾里爬出来的幸存者。"`,
        choices: [
            {
                text: '询问莫里斯关于这个世界的情况',
                next: 'prologue_maurice_info'
            },
            {
                text: '询问莫里斯关于守夜人的事',
                next: 'prologue_maurice_watchers'
            }
        ]
    },

    prologue_maurice_info: {
        text: `莫里斯叹了口气。

"雾灾已经持续了三年。没人知道它从哪来，只知道它改变了一切。"

他指了指周围的废墟。

"这里曾经是一座繁华的城市。现在？只剩下怪物和我们这些还在挣扎的人。"

"雾会侵蚀人的理智，让人发疯，变成那些...东西。你能在这里保持清醒，说明你有些特别。"

他看了看你手中的护符。

"而且你有遗物。这是好东西，能在一定程度上保护你不受雾的侵蚀。"`,
        choices: [
            {
                text: '询问守夜人是什么',
                next: 'prologue_maurice_watchers'
            },
            {
                text: '询问如何离开这里',
                next: 'prologue_maurice_leave'
            }
        ]
    },

    prologue_maurice_watchers: {
        text: `"守夜人？"莫里斯露出一丝苦笑。

"我们是人类最后的希望。一群不肯放弃的傻瓜。"

"我们在各个据点点起篝火，用火焰驱散迷雾。我们的信条是——'以火驱雾，以刃守夜'。"

"我在附近有个安全屋，一个废弃的地铁站。那里有食物、水，还有其他幸存者。你要跟我来吗？"

他的眼神中带着真诚，但也有一丝...你说不清的东西。`,
        choices: [
            {
                text: '接受莫里斯的邀请',
                next: 'prologue_accept_invite'
            },
            {
                text: '询问更多关于雾灾的信息',
                next: 'prologue_maurice_mist'
            }
        ]
    },

    prologue_maurice_mist: {
        text: `莫里斯的表情变得严肃。

"雾灾...不是天灾。"

他压低声音。

"我听到过一些传言，说雾是被人召唤来的。某种实验，某种...接触。"

"但这些都是传言。真相？真相可能比雾本身更可怕。"

他看着你的眼睛。

"现在最重要的是活下去。其他的，以后再说。跟我来吧。"`,
        choices: [
            {
                text: '接受莫里斯的邀请',
                next: 'prologue_accept_invite'
            }
        ]
    },

    prologue_maurice_leave: {
        text: `"离开？"莫里斯摇摇头。

"雾覆盖了整个世界。没有'离开'这个选项，只有'在哪里生存'。"

"但如果你想找到一个相对安全的地方，我在附近有个安全屋。一个废弃的地铁站，有篝火，有其他幸存者。"

"跟我来吧。一个人在这片废墟里走不远。"`,
        choices: [
            {
                text: '接受莫里斯的邀请',
                next: 'prologue_accept_invite'
            }
        ]
    },

    prologue_accept_invite: {
        text: `你点了点头。

"明智的选择。"莫里斯露出赞许的表情。

"跟我来，路上小心。雾里的东西随时可能出现。"

你们开始在废墟中穿行。莫里斯走在前面，他的步枪始终保持着警惕的姿态。

走了大约二十分钟，你们来到了一处地铁站的入口。楼梯向下延伸，消失在黑暗中，但你能看到下方有微弱的火光。

"欢迎来到'灰烬走廊'，"莫里斯说，"这是我们的前哨据点之一。"

就在他说完这句话的瞬间——

远处传来一声震耳欲聋的咆哮，整个地面都在颤抖。雾的浓度急剧上升，几乎伸手不见五指。

"该死！"莫里斯脸色大变，"雾潮！大型畸变体正在接近！"

他抓住你的肩膀。

"快进去！我会挡住它！记住——别相信雾里的任何人！"

说完，他转身冲进了雾中，步枪的光芒在浓雾中闪烁。

你站在地铁站入口，听着远处传来的枪声和咆哮声，心中充满了疑问和不安。

【序章结束】
【第一章：灰烬走廊 - 即将开始】

【感谢游玩原型版本！】
【这是一个简单的演示，展示了游戏的核心机制：】
【- 文字叙事与选择】
【- 回合制战斗】
【- 理智系统】
【- 理智检定】
【完整版本将包含更多内容...】`,
        choices: [
            {
                text: '重新开始',
                next: 'restart'
            }
        ]
    },

    restart: {
        text: '游戏重置...',
        onEnter: (game) => {
            game.reset();
        }
    }
};

class Game {
    constructor() {
        this.state = new GameState();
        this.combatLog = [];
        this.init();
    }

    init() {
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });

        // 战斗按钮事件
        document.querySelectorAll('.combat-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleCombatAction(e.target.dataset.action);
            });
        });
    }

    startGame() {
        document.getElementById('start-screen').classList.add('hidden');
        this.loadScene(this.state.currentScene);
    }

    loadScene(sceneId) {
        if (sceneId === 'restart') {
            location.reload();
            return;
        }

        const scene = scenes[sceneId];
        if (!scene) {
            console.error('Scene not found:', sceneId);
            return;
        }

        this.state.currentScene = sceneId;

        // 显示场景文本
        const storyText = document.getElementById('story-text');
        storyText.innerHTML = scene.text;

        // 执行场景进入事件
        if (scene.onEnter) {
            scene.onEnter(this);
        }

        // 显示选项
        this.showChoices(scene.choices || []);
    }

    showChoices(choices) {
        const container = document.getElementById('choices-container');
        container.innerHTML = '';

        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.addEventListener('click', () => {
                this.makeChoice(choice);
            });
            container.appendChild(btn);
        });
    }

    makeChoice(choice) {
        // 执行选择效果
        if (choice.effect) {
            choice.effect(this);
        }

        // 加载下一个场景
        if (choice.next) {
            this.loadScene(choice.next);
        }
    }

    startCombat(enemyId) {
        const enemyData = enemies[enemyId];
        if (!enemyData) {
            console.error('Enemy not found:', enemyId);
            return;
        }

        this.state.inCombat = true;
        this.state.enemy = { ...enemyData };

        // 显示战斗UI
        document.getElementById('combat-ui').classList.remove('hidden');
        document.getElementById('main-content').style.display = 'none';

        // 更新敌人信息
        document.getElementById('enemy-name').textContent = enemyData.name;
        document.getElementById('enemy-hp').textContent = `${enemyData.hp}/${enemyData.maxHp}`;
        document.getElementById('enemy-horror').textContent = enemyData.horror;

        // 清空战斗日志
        this.combatLog = [];
        this.updateCombatLog();

        // 添加战斗开始信息
        this.addLog(`【战斗开始】${enemyData.description}`, 'system');
        this.addLog(`你遭遇了${enemyData.name}！`, 'system');
    }

    handleCombatAction(action) {
        if (!this.state.inCombat || !this.state.enemy) return;

        let playerDamage = 0;
        let enemyDamage = 0;

        switch (action) {
            case 'attack':
                playerDamage = Math.floor(Math.random() * 15) + 10;
                this.state.enemy.hp -= playerDamage;
                this.addLog(`你攻击了${this.state.enemy.name}，造成${playerDamage}点伤害。`, 'player-action');
                break;

            case 'defend':
                this.addLog('你采取防御姿态，减少受到的伤害。', 'player-action');
                enemyDamage = Math.floor(Math.random() * 8) + 5;
                break;

            case 'skill':
                // 简化版技能
                playerDamage = Math.floor(Math.random() * 20) + 15;
                this.state.enemy.hp -= playerDamage;
                this.state.loseSanity(5);
                this.addLog(`你使用了特殊技能，造成${playerDamage}点伤害，但消耗了5点理智。`, 'player-action');
                break;

            case 'flee':
                if (Math.random() > 0.5) {
                    this.addLog('你成功逃离了战斗！', 'system');
                    this.endCombat(false);
                    this.loadScene('prologue_look_around');
                    return;
                } else {
                    this.addLog('逃跑失败！', 'system');
                    enemyDamage = Math.floor(Math.random() * 10) + 8;
                }
                break;
        }

        // 检查敌人是否死亡
        if (this.state.enemy.hp <= 0) {
            this.addLog(`${this.state.enemy.name}被击败了！`, 'system');
            this.endCombat(true);
            return;
        }

        // 敌人回合
        if (action !== 'defend' || enemyDamage === 0) {
            enemyDamage = Math.floor(Math.random() * this.state.enemy.damage) + 5;
        }
        
        const dead = this.state.takeDamage(enemyDamage);
        this.addLog(`${this.state.enemy.name}攻击了你，造成${enemyDamage}点伤害。`, 'enemy-action');

        // 检查玩家是否死亡
        if (dead) {
            this.addLog('你倒下了...', 'system');
            this.addLog('【游戏结束】', 'system');
            this.addLog('在完整版中，死亡会触发"亡者回响"机制...', 'system');
            document.querySelectorAll('.combat-btn').forEach(btn => btn.disabled = true);
            return;
        }

        // 更新UI
        document.getElementById('enemy-hp').textContent = `${Math.max(0, this.state.enemy.hp)}/${this.state.enemy.maxHp}`;
        this.updateCombatLog();
    }

    addLog(message, type = '') {
        this.combatLog.push({ message, type });
        this.updateCombatLog();
    }

    updateCombatLog() {
        const logElement = document.getElementById('combat-log');
        logElement.innerHTML = this.combatLog.map(entry => 
            `<div class="log-entry ${entry.type}">${entry.message}</div>`
        ).join('');
        logElement.scrollTop = logElement.scrollHeight;
    }

    endCombat(victory) {
        this.state.inCombat = false;
        this.state.enemy = null;

        if (victory) {
            // 战斗胜利
            setTimeout(() => {
                document.getElementById('combat-ui').classList.add('hidden');
                document.getElementById('main-content').style.display = 'flex';
                this.loadScene('combat_victory');
            }, 1500);
        }
    }

    reset() {
        this.state = new GameState();
        this.combatLog = [];
        this.loadScene('prologue_start');
    }
}

// 启动游戏
const game = new Game();
