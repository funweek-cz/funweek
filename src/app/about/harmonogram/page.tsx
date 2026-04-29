const SCHEDULE_DATA = [
  {
    year: "2026",
    dividerClasses: "mb-10",
    events: [
      {
        day: "TBA",
        month: "ČERVENEC",
        title: "Ustavující schůze",
        description:
          "První setkání ředitelství Funweeku, kde doladíme vizi, schválíme program a dokončíme oficiální propozice.",
      },
      {
        day: "TBA",
        month: "PROSINEC",
        title: "Klíčové plánování",
        description:
          "Velké setkání celého týmu včetně vedoucích. Hlavním bodem je schválení stanov a oficiální ukotvení našeho spolku.",
      },
    ],
  },
  {
    year: "2027",
    dividerClasses: "mt-15 mb-10",
    events: [
      {
        day: "02",
        month: "LEDEN",
        title: "Vznik spolku",
        description:
          "Oficiální zrod spolku Funweek. Od tohoto momentu fungujeme jako právní entita zajišťující organizaci letošního i budoucích ročníků.",
      },
      {
        day: "30",
        month: "DUBEN",
        title: "Pedagogická komise",
        titleClass: "leading-8",
        description:
          "Sestavení odborné komise, která bude dohlížet na kvalitu, edukativní přínos a hladký průběh celého programu.",
      },
      {
        day: "31",
        month: "ČERVENEC",
        title: "Tým vedoucích",
        titleClass: "leading-8",
        description:
          "Představujeme lídry jednotlivých sekcí. Máme tým zkušených vedoucích, kteří vás provedou celou akcí.",
      },
      {
        day: "31",
        month: "SRPEN",
        title: "Finále příprav online kola",
        titleClass: "leading-8",
        description:
          "Ladíme poslední detaily virtuální části. Intenzivní přípravy Funweeku běží na pozadí naplno po celý rok.",
      },
      {
        day: "01",
        month: "ZÁŘÍ",
        title: "Start přihlášek",
        titleClass: "leading-8",
        description:
          "Oficiální spuštění registrací do vědomostního on-line kola Funweeku 2028. Pozor, čas máte jen do konce září!",
      },
      {
        day: "TBA",
        month: "ŘÍJEN",
        title: "Vědomostní online kolo",
        titleClass: "leading-8",
        description:
          "Týden plný výzev! Od pondělí do pátku bojujete o body, o víkendu pak oznámíme seznam postupujících týmů.",
      },
      {
        day: "01",
        month: "LISTOPAD",
        title: "Zahájení projektové části",
        titleClass: "leading-8",
        description:
          "Zveřejňujeme zadání pro kreativní projekty a otevíráme systém pro nahrávání vašich prací.",
      },
    ],
  },
  {
    year: "2028",
    dividerClasses: "mt-15 mb-10",
    events: [
      {
        day: "02",
        month: "DUBEN",
        title: "Nábor dobrovolníků",
        description:
          "Chceš vidět do zákulisí? Hledáme nadšence do našeho realizačního týmu. Podrobnosti najdeš v sekci Dobrovolnictví.",
      },
      {
        day: "TBA",
        month: "KVĚTEN",
        title: "Uzavření projektů",
        description:
          "Konec odevzdávání. Odborná porota vyhodnotí vaše projekty a rozešle pozvánky těm nejlepším týmům přímo na event.",
      },
      {
        day: "19",
        month: "ČERVEN",
        title: "Zahájení Funweeku",
        description:
          "Velký týden začíná! (Předběžný termín). Těšte se na dny nabité workshopy, networkingem a nezapomenutelnými zážitky.",
      },
      {
        day: "23",
        month: "ČERVEN",
        title: "Velké finále",
        description:
          "Vrchol akce v Hradci Králové. Finální prezentace, doprovodný program a vyhlášení vítězů v přímém přenosu.",
      },
    ],
  },
];

export default function HarmonogramPage() {
  return (
    <main className="w-full px-5 md:px-10 mb-20">
      <div className="max-w-7xl mx-auto flex w-full justify-center items-center mt-40">
        <h1 className="text-5xl md:text-7xl font-semibold text-funweek mb-20 md:mb-30">
          Harmonogram příprav
        </h1>
      </div>

      {SCHEDULE_DATA.map((section) => (
        <div key={section.year}>
          <div
            className={`max-w-7xl mx-auto flex-col w-full justify-center items-center border-b ${section.dividerClasses}`}
          >
            <h2>{section.year}</h2>
          </div>
          <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 w-full">
            {section.events.map((event, idx) => (
              <div
                key={idx}
                className="flex bg-gray-100 border border-gray-200 rounded-xl"
              >
                <div className="flex flex-col font-bold bg-funweek text-white rounded-l-xl items-center p-8 justify-center w-38 md:w-43 shrink-0">
                  <h1 className="text-4xl md:text-6xl">{event.day}</h1>
                  <h1 className="text-xl md:text-2xl">{event.month}</h1>
                </div>
                <div className="flex flex-col font-bold justify-center p-6 gap-1 pl-8">
                  <h1 className={`text-2xl md:text-3xl leading-6 md:leading-8 ${event.titleClass || ""}`.trim()}>
                    {event.title}
                  </h1>
                  <p className="font-normal leading-6">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
