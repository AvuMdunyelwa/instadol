//image-gallery


function renderGrid(data, container, createCard) {
    container.innerHTML = '';
        data.forEach(item => {
            const card = createCard(item);
            container.appendChild(card);
          
        });
   
}

//image card builder
function createImageCard(feed) {
    const cell = document.createElement('div');
    cell.classList.add('gallery_cell');

    const img = document.createElement('img');
    img.classList.add('imageCell');
    img.src = feed.image;
    img.alt = feed.imageAbout;

    cell.appendChild(img);
    return cell;
}

//members cards
function createMemberCard(member) {
    const card = document.createElement('div');
    card.classList.add('profile_card');

    const img = document.createElement('img');
    img.classList.add('member_img');
    img.src = member.photo;
    img.alt = member.stageName;

    const name = document.createElement('p');
    name.classList.add('member_name');
    name.textContent = member.stageName;
    memberInfo(member);

    card.append(img, name);
    return card;
}
//album cards
function createAlbumCard(album) {
    const card = document.createElement('div');
    card.classList.add('album_cover');

    const img = document.createElement('img');
        img.classList.add('album_img');
        img.src = album.image;

    const link = document.createElement('a');
    link.classList.add('album_link');
    link.href = album.link;
    link.target = "_blank";
    link.textContent = album.name;
   

    card.append(img, link);
    return card;
}

// image modal 
function pictureView(src, text) {
    //creating modal
    const modal = document.createElement('dialog');
    modal.classList.add('modal');
    document.querySelector('main').appendChild(modal);
    
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal-wrapper');

    const closeModal = document.createElement('div');
    closeModal.classList.add('close-modal');
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');

    const closeView = document.createElement('img');
    closeView.src = '../items/bx-x.svg';

    closeView.onclick = () => {
        modal.remove();
    }

    const imageView = document.createElement('img');
    imageView.src = src;
    
    const imageText = document.createElement('div');
    imageText.classList.add('backgr-info');

    imageText.append(text);
    closeModal.appendChild(closeView);
    imageWrapper.append(imageView, imageText);

    modalWrapper.append(closeModal, imageWrapper);
    modal.appendChild(modalWrapper);
}

function memberInfo(member, alt) {
    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('info-Wrapper');
    
    const stageName = document.createElement('h2');
    const name = document.createElement('p');
    const dob = document.createElement('p');
    const height = document.createElement('p');
    const position = document.createElement('p');
    const nationality = document.createElement('p');
    const zodiacSign = document.createElement('p');
    const instagram = document.createElement('p');
    const funFact = document.createElement('p');
    const link = document.createElement('a');
    const instagramLink = document.createElement('div');
    instagramLink.classList.add('links');
    
    
    for(let i = 0; i < member.length; i++) {
        
        if(alt == member[i].stageName) {
            stageName.textContent = member[i].stageName;
            name.textContent = `Birth Name: ${member[i].name}`;
            dob.textContent = `Date of birth: ${member[i].dob}`;
            height.textContent = `Height: ${member[i].height}`;
            position.textContent = `Position: ${member[i].position}`;
            nationality.textContent = `Nationality: ${member[i].nationality}`;
            zodiacSign.textContent = `Zodiac sign: ${member[i].zodiacSign}`;
            link.href = member[i].instagram;
            link.textContent = member[i].instagram_handle;
            link.target = "_blank";
            instagram.textContent = 'instagram:';
            funFact.textContent = `Fun fact: ${member[i].facts}`;

        };
        
    }
    
    instagramLink.style.display = 'flex'
    instagramLink.append(instagram, link);
    infoWrapper.append(stageName,name,dob,height,position,nationality,zodiacSign,instagramLink,funFact);
    return infoWrapper;
}

//image wide view
function imageView() {
    const images = document.querySelectorAll('#gallery img');
    let imgSrc;
    let imgText;

    images.forEach(img => {
        img.addEventListener('click', (e) => {
            imgSrc = e.target.src;
            imgText = e.target.alt;
            pictureView(imgSrc, imgText);
        });
    });
}

//members image wide view
function imgView(arr) {
    const images = document.querySelectorAll('#members img');
    let imgSrc;
    let imgAbout;

    images.forEach(img => {
        img.addEventListener('click', (e) => {
            const imgAlt = e.target.alt;
            imgSrc = e.target.src;
            imgAbout = memberInfo(arr, imgAlt);
            pictureView(imgSrc, imgAbout);
        });
    });
}



export {renderGrid, createImageCard, createMemberCard, createAlbumCard, imageView, imgView};