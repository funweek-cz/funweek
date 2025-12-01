import React from "react";
import { ChartNoAxesCombined, FileText, SmilePlus, BookMarked, HeartHandshake, FileSearchCorner, FileUser } from "lucide-react";
import Link from "next/link";

export default function VolunteersPage() {
    return (
        <main className="max-w-7xl px-5 sm:px-0 mx-auto mt-30 flex flex-col">
            <div className="flex flex-col justify-center items-center gap-2 py-10">
                <h1 className="text-center text-4xl mb-3 md:mb-0 md:text-5xl font-bold">„Nečekejte na to, až se věci stanou, dělejte je.“</h1>
                <span className="text-center text-xl px-5">Hledáme lidi, co mají chuť přiložit ruku k dílu a být součástí týmu, který posouvá mladé talenty dopředu. Společně podporujeme diverzitu, autenticitu a zdravé sebevědomí u dětí i studentů. U nás získáš prostor růst, naučit se nové věci a hlavně být v prostředí, kde se cítíš vítaně. Pokud chceš dělat něco, co má fakt smysl — přidej se k nám. Funweek tě bude bavit.</span>
            </div>
            <div className="bg-funweek text-white p-10 rounded-xl my-10">
                <h2 id="gabarito" className="text-3xl mb-3 md:mb-0font-bold">Proč se stát dobrovolníkem na Funweeku?</h2>
                <div className="flex flex-col md:flex-row gap-5 mt-8">
                    <div className="flex w-full flex-col border-2 border-white p-5 rounded-lg justify-start items-center gap-2">
                        <BookMarked size="30" />
                        <h3 className="text-2xl" id="gabarito">Co tě škola nenaučí</h3>
                        <span className="text-center">Získáš dovednosti, které se ve školních lavicích prostě neřeší — práce v týmu, organizace eventů, komunikace i zvládání situací, co se mění každou minutou. </span>
                    </div>
                    <div className="flex w-full flex-col border-2 border-white p-5 rounded-lg justify-start items-center gap-2">
                        <SmilePlus size="30" />
                        <h3 className="text-2xl" id="gabarito">Socializace</h3>
                        <span className="text-center">Poznáš novou partu lidí, co má podobnou vizi. Žádný nucený seznamování, jednoduše přirozená atmosféra, kde zapadneš.</span>
                    </div>
                    <div className="flex w-full flex-col border-2 border-white p-5 rounded-lg justify-start items-center gap-2">
                        <HeartHandshake size="30" />
                        <h3 className="text-2xl" id="gabarito">Smysluplná zkušenost</h3>
                        <span className="text-center">Budeš součástí akce, která pomáhá dětem rozvíjet sebevědomí a kreativitu. Tvoje práce má přímý dopad a je fakt vidět.</span>
                    </div>
                    <div className="flex w-full flex-col border-2 border-white p-5 rounded-lg justify-start items-center gap-2">
                        <ChartNoAxesCombined size="30" />
                        <h3 className="text-2xl" id="gabarito">Růst a inspirace</h3>
                        <span className="text-center">Funweek je prostředí, kde se učíš i mimo svou komfortní zónu. Inspiruješ se lidma kolem sebe a sám rosteš díky situacím, který nepřijdou každý den.</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-1/3">
                    <h2 id="gabarito" className="text-3xl mb-3 md:mb-0 font-bold">Být dobrovolníkem, to se hodí!</h2>
                    <span>Když se k nám přidáš, neuděláš tím radost jen týmu a účastníkům – hlavně posuneš sám sebe. Naučíš se věci, který ve škole fakt nenajdeš, dostaneš oficiální potvrzení do životopisu nebo k přihláškám a ještě poznáš hromadu fajn lidí.</span>
                </div>
                <div className="w-full md:w-2/3">
                    <h2 id="gabarito" className="text-3xl mb-3 md:mb-0 font-bold">U nás nestojíš v pozadí</h2>
                    <span>Dobrovolníci jsou pro nás doslova motor celého programu — bez nich by celá akce nemohla vůbec vzniknout. Dostaneš prostor zapojit se do role, která ti sedí, být v kontaktu s organizátory, technikou i soutěžícími a uvidíš všechno z backstage perspektivy. A hlavně, staneš se součástí komunity lidí, která sdílí stejné důležité hodnoty dnešního světa.</span>
                </div>
            </div>
            <div className="bg-funweek text-white p-10 rounded-xl my-10">
                <div className="flex items-center gap-2">
                    <FileText/>
                    <h2 id="gabarito" className="text-3xl">Detailní informace</h2>
                </div>
                <span>Pojďme si přesněji říct, o čem dobrovolnictví na Funweeku je. V této sekci se dozvíš, co tě čeká, co ti nabídneme, co naopak požadujeme a jak to u nás chodí.</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                    <div className="flex w-full flex-col border-2 border-white p-5 rounded-lg justify-start gap-2">
                        <h3 className="text-2xl" id="gabarito">Jak se stát dobrovolníkem?</h3>
                        <span> Než se k nám přidáš, je fajn mít aspoň základní představu o tom, co bys chtěl na Funweeku dělat. Upřímně — bereme úplně každého. Máme tolik různých týmů, že si opravdu každý najde místo, kde ho to bude bavit. Jsi technický typ nebo tě baví počítače? Technický tým je místo přesně pro tebe. Máš rád lidi, povídání a atmosféru? Pak se ti bude líbit komunitní tým. A takových týmů máme spoustu! Všechno najdeš přehledně v přihlášce. A hlavně, volba týmu <u>není závazná</u>. Rádi to s tebou probereme, přehodnotíme to společně a před finálním zařazením se ti stejně někdo z ředitelství ozve. </span>
                        <span> Ať už máš vybráno, nebo si nejsi jistý, prvním krokem je vyplnit přihlášku. Nic složitého — tvrá to jen pár minut a nic k tomu nepotřebuješ. Ptáme se v ní na základní info jako jméno, datum narození, případně kontakty na zákonného zástupce a později i něco o tvém studiu.</span>
                        <span> Po odeslání přihlášky se jí ujme někdo z ředitelství Funweeku. Pokud není důvod ji zamítnout, bereme ji jako předběžně schválenou a brzo se ti ozveme s dalším postupem. </span>
                        <span> Před samotnou akcí tě čeká krátké školení dobrovolníků a taky <u>dobrovolný</u> teambuilding. O tom se ale dozvíš více později. </span>
                    </div>
                    <div className="flex w-full flex-col border-2 border-white p-5 rounded-lg justify-start gap-2">
                        <h3 className="text-2xl" id="gabarito">Co budeš jako dobrovolník dělat?</h3>
                        <span>Nabízíme široký výběr různých týmů. Můžeš se zapojit do soutěže, workshopů, diskuzí — kdekoliv tě to bude bavit. Týmy jsou popsané níže. Nemusíš si vybírat hned — můžeme se o tom pobavit a rozhodnout společně, nebo si klidně vezmi čas na rozmyšlenou.</span>
                        <ul className="list-disc list-inside">
                            <li><b>Public Relations & Socials tým</b> se stará o naše vystupování na sociálních sítích. Jejich odpovědností je, aby byl Funweek viditelný v pozitivním světle a šířil naši vizi veřejnosti.</li>
                            <li><b>Komunitní tým</b> se stará o kontakt s komunitou. Společně s pořadateli vedou a koordinují workshopy a veškeré programy mimo hlavní soutěž. Na finále soutěže dbají na pohodu a pozitivní zážitek soutěžících i našich hostů.</li>
                            <li><b>Produkční tým</b> je zodpovědný za průběh hlavní soutěže. Společně s technickým týmem zajišťují hladký průběh velkého finále a koordinují program soutěže.</li>
                            <li><b>Zdravotní a bezpečnostní tým</b> je zodpovědný za bezpečnost soutěžících a hostů na Funweeku a námi pořádaných programech. Zapojení do tohoto týmu vyžaduje určitá školení a plnoletost.</li>
                            <li><b>Technický tým</b> spravuje veškeré administrativní služby (informační systém, webová stránka a další) a koordinuje online kolo soutěže.</li>
                            <li><b>Tým dobrovolnictví</b> pomáhá na všech našich programech s přípravou a průběhem (například registrace na velkém finále, koordinace informací a podobně).</li>
                        </ul>
                        <span>Věříme, že si v této pestré nabídce každý vybere. Pokud si nejsi jistý, neváhej se na nás kdykoliv obrátit na <a href="mailto:info@funweek.cz">info@funweek.cz</a>.</span>
                    </div>
                    <div className="flex w-full flex-col border-2 border-white p-5 rounded-lg justify-start gap-2">
                        <h3 className="text-2xl" id="gabarito">Co dobrovolníkům nabízíme?</h3>
                        <span>Jako dobrovolník u nás získáš nejen cenné zkušenosti a kontakty, ale i řadu konkrétních benefitů. Zde je přehled toho, co pro tebe máme:</span>
                        <ul className="list-disc list-inside">
                            <li><b>Certifikát o dobrovolnictví:</b> Po skončení akce ti vystavíme oficiální certifikát potvrzující tvou účast a zapojení, který se může hodit do životopisu nebo na školu. Informace o certifikátech budou upřesněny cca. rok před začátkem akce.</li>
                            <li><b>Jídlo a pití zdarma:</b> Po celou dobu akce máš jako dobrovolník zajištěné stravování a nealkoholické nápoje, takže se nemusíš starat o logistiku.</li>
                            <li><b>Doprava:</b> V případě potřeby můžeme přispět na cestovní náklady nebo pomoci s organizací dopravy na místo akce.</li>
                            <li><b>Teambuilding a školení:</b> Před akcí tě čeká nepovinný teambuilding, kde poznáš ostatní dobrovolníky, a krátké školení, které tě připraví na tvou roli.</li>
                            <li><b>Komunita a zážitky:</b> Nejen že získáš praktické dovednosti, ale také poznáš spoustu skvělých lidí, kteří sdílejí podobné zájmy a hodnoty.</li>
                        </ul>
                        <span>Pokud máš jakékoliv otázky k benefitům nebo k čemukoliv jinému ohledně dobrovolnictví, neváhej nás kontaktovat na <a href="mailto:info@funweek.cz">info@funweek.cz</a>.</span>
                    </div>
                    <div className="flex w-full flex-col border-2 border-white p-5 rounded-lg justify-start gap-2">
                        <h3 className="text-2xl" id="gabarito">Co od dobrovolníků očekáváme?</h3>
                        <span>Abychom společně vytvořili úspěšnou akci, potřebujeme od našich dobrovolníků několik základních věcí. Není to nic složitého, ale je důležité, abychom byli na stejné vlně.</span>
                        <ul className="list-disc list-inside">
                            <li><b>Spolehlivost a závazek:</b> Když se přihlásíš a potvrdíš svou účast, počítáme s tím, že dorazíš a odvedeš svou práci. Pokud se něco změní, dej svému vedoucímu prosím vědět co nejdřív.</li>
                            <li><b>Aktivní přístup:</b> Očekáváme, že se zapojíš, budeš iniciativní a v rámci svého týmu pomůžeš tam, kde je potřeba. Pamatuj, že máš plné právo kdykoliv říct z jakéhokoliv důvodu ne.</li>
                            <li><b>Týmová spolupráce:</b> Funweek je o komunitě a vzájemné podpoře. Spolupracuj s ostatními, respektuj jejich názory a buď ochotný pomoct.</li>
                            <li><b>Komunikace:</b> Pokud něčemu nerozumíš, nejsi si jistý nebo máš problém, ozvi se. Raději se zeptej, než abys něco pokazil nebo se cítil ztracený — vždy ti rádi pomůžeme.</li>
                            <li><b>Pozitivní přístup:</b> Snažíme se vytvořit přátelskou a vstřícnou atmosféru. Buď příjemný na ostatní účastníky, hosty i dobrovolníky.</li>
                            <li><b>Naše vize a hodnoty:</b> Pokud máš zájem se stát naším dobrovolníkem, očekáváme, že budeš respektovat naše <a href="/about/vision-values" className="underline">vize a hodnoty</a>.</li>
                        </ul>
                        <span>Pokud tato očekávání splníš, bude spolupráce příjemná pro obě strany a společně vytvoříme skvělou akci. Všechno, co potřebuješ vědět, ti vždy včas sdělíme, takže se nemusíš bát, že bys něco přehlédl.</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-2">
                    <Link href="https://funweek.fillout.com/volunteering" className="p-2 px-3 bg-white text-funweek font-bold border-2 rounded-lg flex items-center gap-2 hover:scale-95 transition-all">
                        <FileUser size="20" strokeWidth="2.5"/>
                        Přihláška pro dobrovolníky
                    </Link>
                    <Link href="https://www.notion.so/Detailn-informace-k-dobrovolnictv-2bca3596c03c80bcae71c955d14b8c4b?source=copy_link" className="p-2 px-3 bg-white text-funweek font-bold border-2 rounded-lg flex items-center gap-2 hover:scale-95 transition-all">
                        <FileSearchCorner size="20" strokeWidth="2.5"/>
                        Oficiální dokument s informacemi pro dobrovolníky
                    </Link>
                </div>
            </div>
        </main>
    )
}
