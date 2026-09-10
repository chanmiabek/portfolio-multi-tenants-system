import prisma from '../lib/prisma';


async function main() {
    await prisma.template.create({
        data:{
            name:'miniamal',
            config:{
                theme:{
                    primaryColor:'#6366f1',
                    background:'dark',
                },
            section: {
                hero: true,
                about: true,
                skills: true,
                projects: true,
                blog: true,
                contact: true
            },
            },
        },
    });
    console.log('Template seed successfully')
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });