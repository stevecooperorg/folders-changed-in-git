import {execSync} from 'child_process';
import {chdir} from 'process';

const exec = cmd => execSync(cmd)
    .toString("utf-8");

const execLines = cmd => exec(cmd)
    .split("\n")
    .filter(l => l.length > 0);

chdir("");

const numberOfCommits = 2000;

const commits = execLines(`git log --pretty=format:%H | head -n ${numberOfCommits}`);

const toDirectory = path => execLines(`dirname "${path}"`)[0];

const unique =(arr: any[]) => [...new Set<any>(arr)].sort();

const toPackage = path => path
    .split("/")
    .filter((_, i) => i < 2)
    .join("/");

for (const commitHash of commits) {

    const files = execLines(`git diff-tree --no-commit-id --name-only -r ${commitHash}`);

    if (files.length === 0) {
        continue;
    }

    const packages = unique(files
        .map(toDirectory)
        .filter(x => x !== ".idea")
        .map(toPackage))
        ;

    if (packages.length === 0) {
        continue;
    }

    console.log(`${packages.join(" ")}`);
}
