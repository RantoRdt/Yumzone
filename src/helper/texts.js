const text = [
    { // fr
        home: "Accueil",
        seemenus: "Voir le menu",
        menu: "Menu",
        chatbot: "Chatbot",
        login: "Se connecter",
        loginsignupname: "Connexion et Inscription",
        loginname: "Connexion",
        admin: "Administrateur",
        connectto: "Se connecter à",
        connectasadminto: "Administrateur à",
        required: 'Ce champ est obligatoire',
        invalidemail: 'Email invalide',
        error: "Erreur",
        email: "Adresse électronique",
        password: "Mot de passe",
        cpassword: "Confirmer mot de passe",
        passwordnotequal: "Les mots de passe ne sont pas identiques",
        authfailed: "Adresse électronique ou mot de passe incorrect",
        logout: "Se déconnecter",
        sales: "Ventes",
        orders: "Commandes",
        qlogout: "Voulez-vous vous déconnecter?",
        yes: "Oui",
        no: "Non",
        connecttosavechat1: "",
        connecttosavechatlink: "Connectez-vous",
        connecttosavechat2:  " pour sauvegarder votre discussion",
        user: "Utilisateur",
        orloginwith: "Ou se connecter avec",
        signup: "S'inscrire",
        signupto: "S'inscrire sur",
        username: "Nom d'utilisateur",
        french: "Français",
        english: "Anglais",
        infos: "Informations",
        switchtolightmode: "Passer au thème clair",
        switchtodarkmode: "Passer au thème sombre",
        changelanguage: "Changer la langue",
        somethingwentwrong: "Un problème s'est produit. Veuillez réessayer",
        loginsuccess: "Connexion réussie",
        registersuccess: "Inscription réussie",
        enteryourmsg: "Votre message ...",
        tosavechat: "Connectez-vous pour sauvegarder votre discussion",
        you: "Vous",
        backtohome: "Retourner à la page d'accueil",
        contacts: "Contacts",
        assistance: "Assistance",
        descripizza: "Découvrez l'alliance parfaite du fromage fondu, des tomates juteuses et des garnitures savoureuses. Commandez maintenant et délectez-vous de nos pizzas artisanales.",
        descritacos: "Explorez une expérience gustative unique avec nos tacos innovants. Commandez maintenant et savourez nos créations uniques.",
        describurger: "L'équilibre parfait entre qualité et gourmandise. Commandez maintenant et savourez un festin de hamburgers de qualité supérieure.",
        voirmenu: "Voir le menu",
        ordr: "Commander",
        searchmenu: "Rechercher un plat",
        ourmenu: "Notre menu",
        filters: "Filtres",
        all: "Tout",
        withoutpork: "Sans porc",
        close: "Fermer",
        withpork: "Avec porc",
        back: 'Retour',
        st: "Sous-total",
        confirm: "Confirmer",
		categ : "Catégorie",
        nm : "Nom",
        prx : "Prix",
        prc : "Porc",
        img : "Image",
        act : "Action",
        dlt : "Supprimer",
        adddish: "Ajouter un nouveau plat",
        success: "Succès",
        yourorder: "Votre Commande",
        submitorder: "Valider",
        payment: "Paiement",
        debitcard: "Carte de débit",
        paypal: "PayPal",
        cardnumber: "Numéro de carte",
        expirydate: "Date d'expiration",
        cvv: "Code de sécurité (CVV)",
        ppemail: "E-mail PayPal",
        delivery: "Livraison",
        pickup: "Récupération",
        facture: "Votre facture",
        deliveryplace: "Lieu de livraison",
        deliverydate: "Date et heure de livraison",
        pickupplace: "Lieu de récupération",
        pickupdate: "Date et heure de récupération",
        dinein: "Sur place",
        takeout: "À emporter",
        mobilemoney: "Mobile money",
        phonenumber: "Numéro de téléphone",
        code: "Code",
        deliverydelay: "La commande doit se faire au moins une heure avant la livraison.",
        pickupdelay: "La commande doit se faire au moins une heure avant la récupération.",
        mustbeconnectedtoorder: "Vous devez être connecté pour commander.",
        connectedas: "Connecté(e) en tant que",
        currentinfo: "Informations actuelles",
        phonenumber: "Numéro de téléphone",
        save: "Sauvegarder",

    },
    { // en
        home: "Home",
        seemenus: "See the menu",
        menu: "Menu",
        chatbot: "Chatbot",
        login: "Log in",
        loginsignupname: "Login and Register",
        loginname: "Login",
        admin: "Administrator",
        connectto: "Connect to",
        connectasadminto: "Administrator at",
        required: 'This field is required',
        invalidemail: 'Invalid email',
        error: 'Error',
        email: 'Email address',
        password: 'Password',
        cpassword: "Confirm password",
        passwordnotequal: "Passwords are not identical",
        authfailed: "Incorrect email address or password",
        logout: "Log out",
        sales: "Sales",
        orders: "Orders",
        qlogout: "Do you want to log out?",
        yes: "Yes",
        no: "No",
        connecttosavechat1: "",
        connecttosavechatlink: "Connect",
        connecttosavechat2: "to save your chat",
        user: "User",
        orloginwith: "Or log in with",
        signup: "Sign up",
        signupto: "Register on",
        username: "User name",
        french: "Français",
        english: "English",
        infos: "Informations",
        switchtolightmode: "Switch to light mode",
        switchtodarkmode: "Switch to dark mode",
        changelanguage: "Change language",
        somethingwentwrong: "Something went wrong. Please try again",
        loginsuccess: "Successful login",
        registersuccess: "Successful registration",
        enteryourmsg: "Your message ...",
        tosavechat: "Log in to save your discussion",
        you: "You",
        backtohome: "Back to home page",
        contacts: "Contacts",
        assistance: "Assistance",
        descripizza: "Discover the perfect combination of melted cheese, juicy tomatoes and tasty toppings. Order now and enjoy our handcrafted pizzas.",
        descritacos: "Explore a unique taste experience with our innovative tacos. Order now and enjoy our unique creations.",
        describurger: "The perfect balance between quality and indulgence. Order now and enjoy a feast of top-quality burgers.",
        voirmenu: "See the menu",
        ordr: "Order now",
        searchmenu: "Find a dish",
        ourmenu: "Our menu",
        filters: "Filters",
        all: "All",
        withoutpork: "Pork-free",
        close: "Close",
        withpork: "With pork",
        back: 'Back',
        st: "Subtotal",
        confirm: "Confirm",
		categ: "Category",
        nm: "Name",
        prx: "Price",
        prc: "Pork",
        img: "Image",
        act: "Action",
        dlt: "Delete",
        adddish: "Add new dish",
        success: "Success",
        yourorder: "Your Order",
        submitorder: "Confirm",
        payment: "Paiement",
        debitcard: "Debit Card",
        paypal: "PayPal",
        cardnumber: "Card number",
        expirydate: "Expiry date",
        cvv: "Security code (CVV)",
        ppemail: "PayPal email",
        delivery: "Delivery",
        pickup: "Pickup",
        facture: "Your receipt",
        deliveryplace: "Delivery place",
        deliverydate: "Delivery date",
        pickupplace: "Pickup place",
        pickupdate: "Pickup date",
        dinein: "Dine-in",
        takeout: "Takeout",
        mobilemoney: "Mobile money",
        phonenumber: "Phone number",
        code: "Code",
        deliverydelay: "Orders must be placed at least one hour before delivery.",
        pickupdelay: "Orders must be placed at least one hour before pick-up.",
        mustbeconnectedtoorder: "You must be logged in to order.",
        connectedas: "Connected as",
        currentinfo: "Current informations",
        phonenumber: "Phone number",
        save: "Save",
    }
]

const getKey = lang =>{
    switch (lang){
        case 'en': return 1
        default: return 0
    }
}
const getText = lang => { return text[getKey(lang)] }

export default getText