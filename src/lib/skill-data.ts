export interface Skill {
    name: string;
    icon: string;
    isExpandable?: boolean;
    distros?: readonly Skill[];
}

export interface SkillCategoryData {
    watermark: string;
    color: string;
    skills: readonly Skill[];
}

export const SKILLS_DATA: Record<string, SkillCategoryData> = {
    'Language Skills': {
        watermark: '</>',
        color: 'from-blue-500 to-cyan-500',
        skills: [
            { name: 'Java', icon: 'https://skillicons.dev/icons?i=java' },
            { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=javascript' },
            { name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=typescript' },
            { name: 'C', icon: 'https://skillicons.dev/icons?i=c' },
            { name: 'C++', icon: 'https://skillicons.dev/icons?i=cpp' },
            { name: 'Python', icon: 'https://skillicons.dev/icons?i=python' },
            { name: 'Dart', icon: 'https://skillicons.dev/icons?i=dart' },
            { name: 'Go', icon: 'https://skillicons.dev/icons?i=go' },
            { name: 'Rust', icon: 'https://skillicons.dev/icons?i=rust' },
            { name: 'Kotlin', icon: 'https://skillicons.dev/icons?i=kotlin' },
        ],
    },
    Frameworks: {
        watermark: '🧩',
        color: 'from-green-500 to-emerald-500',
        skills: [
            { name: 'React', icon: 'https://skillicons.dev/icons?i=react' },
            { name: 'Next.js', icon: 'https://skillicons.dev/icons?i=nextjs' },
            { name: 'AWS', icon: 'https://skillicons.dev/icons?i=aws' },
            { name: 'Node.js', icon: 'https://skillicons.dev/icons?i=nodejs' },
            { name: 'Svelte', icon: 'https://skillicons.dev/icons?i=svelte' },
            { name: 'Vite', icon: 'https://skillicons.dev/icons?i=vite' },
            { name: 'Django', icon: 'https://skillicons.dev/icons?i=django' },
            { name: 'Flask', icon: 'https://skillicons.dev/icons?i=flask' },
            { name: 'Astro', icon: 'https://skillicons.dev/icons?i=astro' },
            { name: 'Flutter', icon: 'https://skillicons.dev/icons?i=flutter' },
        ],
    },
    Database: {
        watermark: '🗄️',
        color: 'from-purple-500 to-pink-500',
        skills: [
            { name: 'PostgreSQL', icon: 'https://skillicons.dev/icons?i=postgres' },
            { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql' },
            { name: 'MongoDB', icon: 'https://skillicons.dev/icons?i=mongodb' },
            { name: 'GraphQL', icon: 'https://skillicons.dev/icons?i=graphql' },
            { name: 'Supabase', icon: 'https://skillicons.dev/icons?i=supabase' },
            { name: 'PlanetScale', icon: 'https://skillicons.dev/icons?i=planetscale' },
        ],
    },
    'Tools & Softwares': {
        watermark: '🔨',
        color: 'from-orange-500 to-red-500',
        skills: [
            { name: 'VS Code', icon: 'https://skillicons.dev/icons?i=vscode' },
            { name: 'Visual Studio', icon: 'https://skillicons.dev/icons?i=visualstudio' },
            { name: 'Android Studio', icon: 'https://skillicons.dev/icons?i=androidstudio' },
            { name: 'JetBrains', icon: 'https://skillicons.dev/icons?i=idea' },
            { name: 'Eclipse', icon: 'https://skillicons.dev/icons?i=eclipse' },
            { name: 'Neovim', icon: 'https://skillicons.dev/icons?i=neovim' },
            { name: 'GitLab', icon: 'https://skillicons.dev/icons?i=gitlab' },
            { name: 'Bitbucket', icon: 'https://skillicons.dev/icons?i=bitbucket' },
            { name: 'Replit', icon: 'https://skillicons.dev/icons?i=replit' },
            { name: 'Figma', icon: 'https://skillicons.dev/icons?i=figma' },
            { name: 'Docker', icon: 'https://skillicons.dev/icons?i=docker' },
            { name: 'Postman', icon: 'https://skillicons.dev/icons?i=postman' },
            { name: 'Kafka', icon: 'https://skillicons.dev/icons?i=kafka' },
            { name: 'Grafana', icon: 'https://skillicons.dev/icons?i=grafana' },
        ],
    },
    'Operating Systems': {
        watermark: '🖥️',
        color: 'from-indigo-500 to-purple-500',
        skills: [
            { name: 'Windows', icon: 'https://skillicons.dev/icons?i=windows' },
            { name: 'Zos', icon: 'https://skillicons.dev/icons?i=zos' },
            {
                name: 'Linux',
                icon: 'https://skillicons.dev/icons?i=linux',
                isExpandable: true,
                distros: [
                    { name: 'Ubuntu', icon: 'https://skillicons.dev/icons?i=ubuntu' },
                    { name: 'Arch', icon: 'https://skillicons.dev/icons?i=arch' },
                    { name: 'Fedora', icon: 'https://skillicons.dev/icons?i=fedora' },
                    { name: 'Debian', icon: 'https://skillicons.dev/icons?i=debian' },
                    { name: 'Kali', icon: 'https://skillicons.dev/icons?i=kali' },
                    { name: 'RedHat', icon: 'https://skillicons.dev/icons?i=redhat' },

                ]
            },
            { name: 'Apple', icon: 'https://skillicons.dev/icons?i=apple' },
        ],
    },
};
