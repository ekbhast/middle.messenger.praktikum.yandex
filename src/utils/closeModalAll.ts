export function closeModal(e:Event) {
    const chatMenu = document.querySelector('.chatMenu') as HTMLElement;
    const overlay = document.querySelector('.chatMenu__overlay') as HTMLElement;
    const searchUserId = document.querySelector('.searchUserId') as HTMLElement;
    const searchUsersChats = document.querySelector('.searchUsersChats') as HTMLElement;
    chatMenu?.classList.add('disable');
    overlay?.classList.add('disable');
    searchUserId?.classList.add('disable');
    searchUsersChats?.classList.add('disable');
    console.log('close modal run');
}
