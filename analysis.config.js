// 子进程操作
const {execSync} = require('child_process');
// 默认分支常量
const DefaultBranch = 'main';
// 获取当前分支
function getGitBranch() {
    try {
        const branchName = execSync('git symbolic-ref --short -q HEAD', {
            encoding: 'utf8'
        }).trim();
        return branchName;
    }
    catch (e) {
        return DefaultBranch;
    }
}

module.exports = {
    // 必须，待扫描源码的配置信息
    scanSource: [
        {
            // 必填，项目名称
            name: 'Jade-trip-Test',
            // 必填，需要扫描的文件路径（基准路径为配置文件所在路径）
            path: ['src'],
            // 可选，package.json 文件路径配置，用于收集依赖的版本信息
            packageFile: 'package.json',
            // 可选, 文件路径格式化函数,默认为null,一般不需要配置
            format: null,
            // 可选，项目gitlab/github url的访问前缀，用于点击行信息跳转，不填则不跳转
            httpRepo: `https://github.com/Lin-Haiyang/jade-trip/tree/${getGitBranch()}/`
        }
    ],
    // 必须，要分析的目标依赖名
    analysisTarget: 'framework',
    // 可选，自定义分析插件，默认为空数组，一般不需要配置
    analysisPlugins: [],
    // 可选，需要标记的黑名单api，默认为空数组
    blackList: ['app.localStorage.set', 'location.href', 'window.location.href'],
    // 可选，要分析的BrowserApi，默认为空数组
    browserApis: ['window', 'document', 'history', 'location'],
    // 可选，生成代码分析报告的目录，默认为'report',不支持多级目录配置
    reportDir: 'docs',
    // 可选，代码分析报告标题，默认为'代码依赖分析报告'
    reportTitle: 'Jade-trip-Test代码分析报告',
    // 可选，是否要扫描分析vue中的ts代码，默认为false
    isScanVue: true,
    // 可选，评分插件: Function|'default'|null, default表示运行默认插件，默认为null表示不评分
    scorePlugin: 'default',
    // scorePlugin: myScoreDeal,
    // 可选，开启代码告警及阈值分数(0-100)，默认为null即关闭告警逻辑 (CLI模式生效)
    alarmThreshold: 90
};
