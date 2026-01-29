"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Copy, Phone, Mail, ChevronDown, Check, Send, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

interface MP {
    electorate: string;
    name: string;
    email: string;
    phone: string;
    chamber: "LA" | "LC";
}

const mpList: MP[] = [
    // Constituency MLAs
    { electorate: "Albany", name: "Mr Scott Leary MLA", email: "scott.leary@mp.wa.gov.au", phone: "(08) 9841 8799", chamber: "LA" },
    { electorate: "Armadale", name: "Hon. Dr Tony Buti MLA", email: "armadale@mp.wa.gov.au", phone: "(08) 9495 4877", chamber: "LA" },
    { electorate: "Balcatta", name: "Hon. David Michael MLA", email: "david.michael@mp.wa.gov.au", phone: "(08) 9207 1538", chamber: "LA" },
    { electorate: "Baldivis", name: "Hon. Reece Whitby MLA", email: "baldivis@mp.wa.gov.au", phone: "(08) 9523 2921", chamber: "LA" },
    { electorate: "Bassendean", name: "Hon. Dave Kelly MLA", email: "dave.kelly@mp.wa.gov.au", phone: "(08) 9279 9871", chamber: "LA" },
    { electorate: "Bateman", name: "Ms Kim Giddens MLA", email: "kim.giddens@mp.wa.gov.au", phone: "(08) 9316 1377", chamber: "LA" },
    { electorate: "Belmont", name: "Ms Cassie Rowe MLA", email: "cassie.rowe@mp.wa.gov.au", phone: "(08) 9277 6898", chamber: "LA" },
    { electorate: "Bibra Lake", name: "Ms Sook Yee Lai MLA", email: "sookyee.lai@mp.wa.gov.au", phone: "(08) 9331 8015", chamber: "LA" },
    { electorate: "Bicton", name: "Mrs Lisa O’Malley MLA", email: "bicton@mp.wa.gov.au", phone: "(08) 9319 1732", chamber: "LA" },
    { electorate: "Bunbury", name: "Hon. Don Punch MLA", email: "bunbury@mp.wa.gov.au", phone: "(08) 9791 3636", chamber: "LA" },
    { electorate: "Butler", name: "Mrs Lorna Clarke MLA", email: "lorna.clarke@mp.wa.gov.au", phone: "(08) 9562 0510", chamber: "LA" },
    { electorate: "Cannington", name: "Mr Ron Sao MLA", email: "cannington@mp.wa.gov.au", phone: "(08) 9356 5011", chamber: "LA" },
    { electorate: "Carine", name: "Mr Liam Staltari MLA", email: "liam.staltari@mp.wa.gov.au", phone: "(08) 9246 1800", chamber: "LA" },
    { electorate: "Central Wheatbelt", name: "Mr Lachlan Hunter MLA", email: "lachlan.hunter@mp.wa.gov.au", phone: "(08) 9622 2871", chamber: "LA" },
    { electorate: "Churchlands", name: "Mr Basil Zemplias MLA", email: "bazil.zempilas@mp.wa.gov.au", phone: "(08) 9383 7120", chamber: "LA" },
    { electorate: "Cockburn", name: "Mr David Scaife MLA", email: "david.scaife@mp.wa.gov.au", phone: "(08) 9414 3266", chamber: "LA" },
    { electorate: "Collie-Preston", name: "Ms Jodie Hanns MLA", email: "Jodie.hanns@mp.wa.gov.au", phone: "(08) 9734 2073", chamber: "LA" },
    { electorate: "Cottesloe", name: "Ms Sandra Brewer MLA", email: "Sandra.brewer@mp.wa.gov.au", phone: "(08) 9383 1505", chamber: "LA" },
    { electorate: "Darling Range", name: "Mr Hugh Jones MLA", email: "hugh.jones@mp.wa.gov.au", phone: "(08) 9525 4822", chamber: "LA" },
    { electorate: "Dawesville", name: "Mrs Lisa Munday MLA", email: "lisa.munday@mp.wa.gov.au", phone: "(08) 9534 3200", chamber: "LA" },
    { electorate: "Forrestfield", name: "Hon. Stephen Price MLA", email: "stephen.price.mla@mp.wa.gov.au", phone: "(08) 9454 6415", chamber: "LA" },
    { electorate: "Fremantle", name: "Hon. Simone McGurk", email: "fremantle@mp.wa.gov.au", phone: "(08) 9336 7000", chamber: "LA" },
    { electorate: "Geraldton", name: "Mrs Kirrilee Warr MLA", email: "GeraldtonElectorate@mp.wa.gov.au", phone: "(08) 9960 7961", chamber: "LA" },
    { electorate: "Girrawheen", name: "Hon. Meredith Hammat MLA", email: "meredith.hammat@mp.wa.gov.au", phone: "(08) 9345 2005", chamber: "LA" },
    { electorate: "Hillarys", name: "Ms Caitlin Collins MLA", email: "caitlin.collins@mp.wa.gov.au", phone: "(08) 9402 0070", chamber: "LA" },
    { electorate: "Jandakot", name: "Mr Stephen Pratt MLA", email: "stephen.pratt@mp.wa.gov.au", phone: "(08) 9310 8777", chamber: "LA" },
    { electorate: "Joondalup", name: "Ms Emily Hamilton MLA", email: "emily.hamilton@mp.wa.gov.au", phone: "(08) 9300 3990", chamber: "LA" },
    { electorate: "Kalamunda", name: "Mr Adam Hort MLA", email: "adam.hort@mp.wa.gov.au", phone: "(08) 9293 4747", chamber: "LA" },
    { electorate: "Kalgoorlie", name: "Ms Ali Kent MLA", email: "ali.kent@mp.wa.gov.au", phone: "(08) 9021 6766", chamber: "LA" },
    { electorate: "Kimberley", name: "Ms Divina D’Anna MLA", email: "divina.danna@mp.wa.gov.au", phone: "(08) 9192 3111", chamber: "LA" },
    { electorate: "Kingsley", name: "Hon. Jessica Stojkovski MLA", email: "jessica.stojkovski@mp.wa.gov.au", phone: "(08) 9309 2666", chamber: "LA" },
    { electorate: "Kwinana", name: "Hon. Roger Cook MLA", email: "kwinana@mp.wa.gov.au", phone: "(08) 9439 6444", chamber: "LA" },
    { electorate: "Landsdale", name: "Mr Daniel Pastorelli MLA", email: "Daniel.pastorelli@mp.wa.gov.au", phone: "(08) 9247 2477", chamber: "LA" },
    { electorate: "Maylands", name: "Mr Dan Bull MLA", email: "dan.bull@mp.wa.gov.au", phone: "(08) 9370 3550", chamber: "LA" },
    { electorate: "Mid-West", name: "Mr Shane Love MLA", email: "mid-west@mp.wa.gov.au", phone: "(08) 9927 2333", chamber: "LA" },
    { electorate: "Midland", name: "Mr Steve Catania MLA", email: "midland@mp.wa.gov.au", phone: "(08) 9274 8811", chamber: "LA" },
    { electorate: "Mindarie", name: "Mr Mark Folkard MLA", email: "mark.folkard@mp.wa.gov.au", phone: "(08) 9407 8356", chamber: "LA" },
    { electorate: "Morley", name: "Hon. Amber-Jade Sanderson MLA", email: "amber.jade.sanderson@mp.wa.gov.au", phone: "(08) 9275 7000", chamber: "LA" },
    { electorate: "Mount Lawley", name: "Mr Frank Paolino MLA", email: "frank.paolino@mp.wa.gov.au", phone: "(08) 9472 0800", chamber: "LA" },
    { electorate: "Murray-Wellington", name: "Mr David Bolt MLA", email: "david.bolt@mp.wa.gov.au", phone: "(08) 9531 3155", chamber: "LA" },
    { electorate: "Nedlands", name: "Mr Jonathan Huston MLA", email: "Jonathan.huston@mp.wa.gov.au", phone: "(08) 9386 3064", chamber: "LA" },
    { electorate: "Oakford", name: "Mr Yaz Mubarakai MLA", email: "yaz.mubarakai@mp.wa.gov.au", phone: "0450 566 400", chamber: "LA" },
    { electorate: "Perth", name: "Hon. John Carey MLA", email: "john.carey@mp.wa.gov.au", phone: "(08) 6552 5300", chamber: "LA" },
    { electorate: "Pilbara", name: "Mr Kevin Michel MLA", email: "kevin.michel@mp.wa.gov.au", phone: "(08) 9144 4113", chamber: "LA" },
    { electorate: "Riverton", name: "Dr Jags Krishnan MLA", email: "jags.krishnan@mp.wa.gov.au", phone: "(08) 9332 1589", chamber: "LA" },
    { electorate: "Rockingham", name: "Mrs Magenta Marshall MLA", email: "magenta.marshall@mp.wa.gov.au", phone: "(08) 9592 7422", chamber: "LA" },
    { electorate: "Roe", name: "Mr Peter Rundle MLA", email: "peter.rundle@mp.wa.gov.au", phone: "(08) 9881 1225", chamber: "LA" },
    { electorate: "Scarborough", name: "Mr Stuart Aubery", email: "stuart.aubery@mp.wa.gov.au", phone: "(08) 9204 2777", chamber: "LA" },
    { electorate: "Secret Harbour", name: "Hon. Paul Papalia CSC MLA", email: "paul.papalia@mp.wa.gov.au", phone: "(08) 6552 5600", chamber: "LA" },
    { electorate: "South Perth", name: "Mr Geoff Baker MLA", email: "geoff.baker@mp.wa.gov.au", phone: "(08) 9368 6270", chamber: "LA" },
    { electorate: "Southern River", name: "Mr Terry Healy MLA", email: "terry.healy@mp.wa.gov.au", phone: "(08) 9256 4900", chamber: "LA" },
    { electorate: "Swan Hills", name: "Mrs Michelle Maynard MLA", email: "michelle.maynard@mp.wa.gov.au", phone: "(08) 9296 7688", chamber: "LA" },
    { electorate: "Thornlie", name: "Ms Colleen Egan MLA", email: "colleen.egan@mp.wa.gov.au", phone: "(08) 9493 2223", chamber: "LA" },
    { electorate: "Vasse", name: "Ms Libby Mettam MLA", email: "libby.mettam@mp.wa.gov.au", phone: "(08) 9752 1949", chamber: "LA" },
    { electorate: "Victoria Park", name: "Hon. Hannah Beazley MLA", email: "Hannah.beazley@mp.wa.gov.au", phone: "(08) 9361 1777", chamber: "LA" },
    { electorate: "Wanneroo", name: "Hon. Sabine Winton MLA", email: "sabine.winton.mla@mp.wa.gov.au", phone: "(08) 9405 1244", chamber: "LA" },
    { electorate: "Warren-Blackwood", name: "Mr Bevan Eatts MLA", email: "bevan.eatts@mp.wa.gov.au", phone: "(08) 9848 3171", chamber: "LA" },
    { electorate: "West Swan", name: "Hon. Rita Saffioti MLA", email: "westswan@mp.wa.gov.au", phone: "(08) 9248 3822", chamber: "LA" },
];

const ministers: MP[] = [
    { electorate: "Premier", name: "Hon. Roger Cook MLA", email: "wa-government@dpc.wa.gov.au", phone: "(08) 6552 5000", chamber: "LA" },
    { electorate: "Health Minister", name: "Hon. Meredith Hammat MLA", email: "minister.hammat@dpc.wa.gov.au", phone: "(08) 6552 5700", chamber: "LA" },
    { electorate: "Police & Road Safety Minister", name: "Hon. Reece Whitby MLA", email: "minister.whitby@dpc.wa.gov.au", phone: "(08) 6552 6300", chamber: "LA" },
];

const upperHouse: MP[] = [
    { electorate: "Upper House", name: "Hon. Klara Andric MLA", email: "klara.andric@mp.wa.gov.au", phone: "(08) 9337 9176", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Jess Beckerling MLC", email: "jess.beckerling@mp.wa.gov.au", phone: "(08) 9311 7813", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Michelle Boylan MLC", email: "michelle.boylan@mp.wa.gov.au", phone: "(08) 9792 5628", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Rod Caddies MLC", email: "rod.caddies@mp.wa.gov.au", phone: "", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Dan Caddy MLC", email: "daniel.caddy@mp.wa.gov.au", phone: "(08) 9301 1896", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Sandra Carr MLC", email: "sandra.carr@mp.wa.gov.au", phone: "(08) 9964 1001", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Lauren Cayoun MLC", email: "lauren.cayoun@mp.wa.gov.au", phone: "", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Tim Clifford MLC", email: "tim.clifford@mp.wa.gov.au", phone: "(08) 9211 2100", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Alanna Clohesy MLC", email: "alanna.clohesy@mp.wa.gov.au", phone: "(08) 9272 1718", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Stephen Dawson MLC", email: "stephen.dawsonmp@mp.wa.gov.au", phone: "(08) 9140 1525", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Amanda Dorn MLC", email: "amanda.dorn@mp.wa.gov.au", phone: "(08) 9274 8484", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Simon Ehrenfeld MLC", email: "simon.ehrenfeld@mp.wa.gov.au", phone: "(08) 9322 4435", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Julie Freeman MLC", email: "julie.freeman@mp.wa.gov.au", phone: "(08) 9144 4187", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Nick Goiran MLC", email: "office.goiran@mp.wa.gov.au", phone: "(08) 9398 3800", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Maryka Groenewald MLC", email: "maryka.groenewald@mp.wa.gov.au", phone: "", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Klasey Hirst MLC", email: "klasey.hirst@mp.wa.gov.au", phone: "0499 244 815", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Michelle Hofmann MLC", email: "office.hofmann@mp.wa.gov.au", phone: "(08) 9311 7809", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Rob Horstman MLC", email: "rob.horstman@mp.wa.gov.au", phone: "(08) 9576 0141", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Jackie Jarvis MLC", email: "jackie.jarvis@mp.wa.gov.au", phone: "(08) 6552 6200", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Dr Parwinder Laur MLC", email: "parwinder.kaur@mp.wa.gov.au", phone: "(08) 9457 2818", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Ayor Makur Chuot MLC", email: "ayor.makurchuot@mp.wa.gov.au", phone: "(08) 9344 1686", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Steve Martin MLC", email: "steve.martin@mp.wa.gov.au", phone: "(08) 9881 1558", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Sophie McNeill MLC", email: "Sophie.mcneill@mp.wa.gov.au", phone: "(08) 9311 7850", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Andrew O’Donnell MLC", email: "andrew.odonnell@mp.wa.gov.au", phone: "(08) 9201 0582", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Dr Brad Pettitt MLC", email: "brad.pettitt@mp.wa.gov.au", phone: "(08) 9430 7755", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Sam Rowe MLC", email: "Samantha.rowe@mp.wa.gov.au", phone: "(08) 9841 6384", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Phil Scott MLC", email: "philip.scott@mp.wa.gov.au", phone: "(08) 9364 4277", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Tjorn Sibma MLC", email: "tjorn.sibma@mp.wa.gov.au", phone: "(08) 9440 4422", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Anthony Spagnolo MLC", email: "anthony.spagnolo@mp.wa.gov.au", phone: "(08) 9379 0840", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Dr Katrina Stratton MLC", email: "katrina.stratton@mp.wa.gov.au", phone: "(08) 9725 3711", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Matthew Swinbourn MLC", email: "m.swinbourn.mlc@mp.wa.gov.au", phone: "(08) 9452 8311", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Dr Steve Thomas MLC", email: "steve.thomas@mp.wa.gov.au", phone: "(08) 9792 5628", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Neil Thomson MLC", email: "neil.thomson@mp.wa.gov.au", phone: "0417 453 033", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Phil Twiss MLC", email: "office.twiss@mp.wa.gov.au", phone: "", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Dr Brian Walker MLC", email: "brian.walker.mlc@mp.wa.gov.au", phone: "(08) 9226 3550", chamber: "LC" },
    { electorate: "Upper House", name: "Hon. Pierre Yang MLC", email: "pierre.yang.mp@mp.wa.gov.au", phone: "(08) 9380 6957", chamber: "LC" }
];

// Combine all target emails for CC
const ccEmails = [...ministers, ...upperHouse].map(m => m.email).join(',');

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-2 group"
    >
        <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#00653b] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00653b] group-hover:text-white">
            <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium text-gray-600 group-hover:text-[#00653b] transition-colors">{label}</span>
    </a>
);

export default function THCDrivingPage() {
    const [selectedMP, setSelectedMP] = useState<MP | null>(null);
    const [activeTab, setActiveTab] = useState<"email" | "phone" | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    const getTemplate1 = (mpName: string) => `Dear ${mpName},
I am writing to draw your attention to the anticipated report from the Ministerial Working Group into THC and Driving, which the Health Minister is expected to respond to when Parliament resumes.
To be clear, this is not a template email.  What I am looking to do is to share my own personal story with you, my constituency MP.  As such, I would appreciate response when you are able.
[insert your personal story here]
Please bring this matter to the attention of your party colleagues, and fight for my right to drive while unimpaired.
Remember: Presence does not equal impairment.
Yours faithfully,
[Your name and suburb]`;

    const getTemplate2 = (mpName: string) => `Dear ${mpName},
As my constituency MP, I would appreciate your assistance with an issue that is very dear to my heart – THC Driving reform.
You will doubtless be aware that the Health Minister formed a Ministerial Working Group to look into this issue last year.  That group was to have submitted its report to the Minister by the end of 2025, and as such I am hoping she will make a public statement on the issue in the near future.
To be clear, no one is asking that we put impaired drivers on our roads.  Impaired drivers should be dealt with under the full weight of the law.  Since has shown, however, that patients prescribed medicinal cannabis by their GP or specialist can still test positive weeks or even months later, due to non-impairing metabolites remaining in their system.
Other states have already addressed, or are addressing, this situation.  Victoria has been running a medicinal cannabis driving trial for close on two years now, and NSW has been contemplating a trial of its own in recent months.  Meanwhile, in Tasmania, all prescription drugs are treated equally.  That means that Tasmanian drivers have a defence in court for mere presence, so long as there was no evidence of impairment.  That law has been in operation since before medicinal cannabis was legalised in 2016.  According to date from the National Road Safety Data Hub, Tasmania’s crash and fatality numbers have seen no greater increases than in any other state, including here in WA, over the intervening decade.
Meanwhile, here in Western Australia, law-abiding citizens are being penalised on a regular basis.  To give you a practical example, if a medicinal cannabis patient is involved in an accident which occurred through no fault of their own – let’s say someone drives into the back of their car – the innocent party is likely to be penalised more heavily than the at-fault driver, and almost certainly lose his or her licence.  This inequity cannot be allowed to continue, especially when other states across Australia have already acknowledged the need to legislate.
Meanwhile, around the world other jurisdictions are finding solutions of their own.  In 2024, for example, Germany introduced a 3.5 nanogram per millilitre limit for drivers.  This surely shows that it is possible to set a workable limit, and to test for it, should the government opt to go down that particular route.
All this bring said, I would ask two things of you:
1.	Advocate for those of your constituents who are taking legally prescribed medication, so that they can drive when not impaired;
And,
2.	Urge the Health Minister and the Premier to release the advice from the Ministerial Working Group as soon as possible, along with a government response to the same.
It is time for WA to catch up with other jurisdictions across Australia and the globe, and to stop discriminating against drivers who are doing the right thing, and are not a risk to other road users.
PRESENCE DOES NOT EQUAL IMPAIRMENT.
Thank you for taking the time to read this email, and I hope that I can look forward to having your support in this space in the coming weeks and months.
Yours sincerely,
[Insert name and suburb]`;

    const getPhoneScript = (mpName: string) => `“Hi, my name is <Name> from <Suburb>,

I’m asking ${mpName} to support a driving law that tests for actual impairment, not the mere presence of medicinal cannabis.

<Choose 2–3 key points>

I urge ${mpName} to fix this broken law that traps law-abiding patients.

Presence does not equal impairment.

Thank you for your time.”`;

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
            background-size: 200% auto;
            animation: flow 3s linear infinite;
        }
      `}</style>
            <Navigation />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-[#00653b] text-white py-12 md:py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/assembly.jpg')] bg-cover bg-center opacity-10"></div>
                    <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            We have an historic opportunity!
                        </h1>
                        <p className="text-xl md:text-2xl font-medium text-emerald-100 max-w-2xl mx-auto">
                            Your MP Can Fix This. Tell Them Now 📢
                        </p>
                    </div>
                </section>

                {/* New Feature Image Section - Outside white box */}
                <div className="container mx-auto px-4 max-w-5xl -mb-16 relative z-10 mt-8">
                    <Image
                        src="/images/thcdriver.png"
                        alt="THC Driving Campaign"
                        width={1200}
                        height={675}
                        className="w-full rounded-2xl shadow-2xl border-4 border-white"
                    />
                </div>

                {/* Content Section */}
                <section className="py-8 md:py-16 pt-24">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-8 border border-gray-100 mt-6">
                            <div className="prose prose-emerald lg:prose-lg mx-auto">

                                <p className="lead text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                    If you use <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-600 animate-gradient-text font-black px-1">MEDICINAL CANNABIS</span> legally prescribed by your doctor, you are trapped by a broken law.
                                </p>

                                <p className="mt-6">
                                    You can drive safely. You are not impaired. You pose no risk to anyone on the road. Yet if you are stopped and tested, you can be charged with drug driving, and convicted, regardless of whether your cannabis affected your ability to drive at all.
                                </p>

                                <div className="my-10 p-4 border-l-4 border-[#00653b] bg-emerald-50">
                                    <p className="font-bold text-[#00653b] text-xl m-0 italic">
                                        “This is not safe. It is not fair. It is not the law that other Australian states have accepted.”
                                    </p>
                                </div>

                                <p>
                                    Current WA road law does not distinguish between prescribed medical use and illicit use. It does not test for impairment. It punishes prescription-holding patients for traces of THC that may linger in their system long after any effect has worn off. Both Tasmania and Victoria have driving laws that consider medicinal cannabis. The law recognises what doctors, patients, and neuroscience already know: the presence of a substance is not the same as impairment.
                                </p>

                                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">West Australia is about to have the same opportunity.</h3>

                                <p>
                                    The WA Medicinal Cannabis and Safe Driving Working Group is developing recommendations right now. The moment to shape that outcome is now! If your MP hears from you and from others using medicinal cannabis lawfully, it changes how this problem is framed. Silence means this stays broken.
                                </p>
                                <p>
                                    You deserve a law that protects your safety and respects your rights as a person following medical advice.
                                </p>

                                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 my-8">
                                    <h4 className="flex items-center text-lg font-bold text-[#00653b] mb-4">
                                        Tell your MP to:
                                    </h4>
                                    <ul className="space-y-3 list-none pl-0">
                                        <li className="flex items-start">
                                            <span className="mr-2 text-2xl">🥬</span>
                                            <span>Support driving laws that test for actual impairment, not presence.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 text-2xl">🥬</span>
                                            <span>Align WA with Tasmania and Victoria.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 text-2xl">🥬</span>
                                            <span>Fix the gap between what the law says and what safety actually requires.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Slogan Moved Here */}
                                <div className="my-10 p-6 bg-red-50 border-l-4 border-red-500 text-center rounded-r-lg">
                                    <h2 className="text-3xl md:text-4xl font-black text-red-600 leading-none mb-2 tracking-tight uppercase">
                                        Presence Does Not<br />Equal Impairment
                                    </h2>
                                </div>

                            </div>
                        </div>

                        {/* Action Center - Combined Lookup and Templates */}
                        <div id="action" className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 scroll-mt-24">
                            <div className="bg-[#00653b] p-6 text-white text-center">
                                <h2 className="text-2xl font-bold mb-2">Take Action Now! ✊</h2>
                                <p className="opacity-90">Find your MP and make your voice heard</p>
                            </div>

                            <div className="p-6 md:p-10">
                                {/* MP Select */}
                                <div className="mb-8">
                                    <label className="block text-lg font-bold text-gray-900 mb-2">
                                        1. Select your Electorate or MP
                                    </label>
                                    <p className="text-gray-500 text-sm mb-3">To get started, choose your local area from the list.</p>
                                    <div className="relative">
                                        <select
                                            className="w-full p-4 pr-10 border border-gray-300 rounded-xl appearance-none focus:ring-2 focus:ring-[#00653b] focus:border-[#00653b] transition-all bg-white text-gray-800 text-lg"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const found = [...mpList, ...ministers].find(m => m.name === value);
                                                setSelectedMP(found || null);
                                                setActiveTab('email'); // Default to email when MP selected
                                            }}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select your electorate or MP...</option>
                                            {mpList.map((m, i) => (
                                                <option key={i} value={m.name}>{m.electorate} - {m.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Don&apos;t know your electorate? <a href="https://www.elections.wa.gov.au/electorates" target="_blank" rel="noopener noreferrer" className="text-[#00653b] hover:underline">Check here</a>
                                    </p>
                                </div>

                                {selectedMP && (
                                    <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                                        <div className="mb-6">
                                            <label className="block text-lg font-bold text-gray-900 mb-4">
                                                2. Choose how to contact them
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    onClick={() => setActiveTab('email')}
                                                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${activeTab === 'email'
                                                        ? 'border-[#00653b] bg-emerald-50 text-[#00653b] ring-1 ring-[#00653b]'
                                                        : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50 text-gray-600'
                                                        }`}
                                                >
                                                    <Mail className={`w-8 h-8 ${activeTab === 'email' ? 'text-[#00653b]' : 'text-gray-400'}`} />
                                                    <span className="font-bold text-lg">Send Email</span>
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('phone')}
                                                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${activeTab === 'phone'
                                                        ? 'border-[#00653b] bg-emerald-50 text-[#00653b] ring-1 ring-[#00653b]'
                                                        : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50 text-gray-600'
                                                        }`}
                                                >
                                                    <Phone className={`w-8 h-8 ${activeTab === 'phone' ? 'text-[#00653b]' : 'text-gray-400'}`} />
                                                    <span className="font-bold text-lg">Phone Call</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Email Content */}
                                        {activeTab === 'email' && (
                                            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">

                                                {/* Giant Action Button */}
                                                <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-xl p-6 text-center">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to send?</h3>
                                                    <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                                                        Click the button below to open your email app. It will automatically fill in your MP&apos;s address, plus valuable CCs for maximum impact.
                                                    </p>
                                                    <a
                                                        href={`mailto:${selectedMP.email}?cc=${ccEmails}&subject=THC Driving Reform&body=${encodeURIComponent(getTemplate1(selectedMP.name))}`}
                                                        className="group relative inline-flex items-center justify-center gap-3 w-full md:w-auto px-10 py-6 bg-[#00653b] text-white text-2xl font-black rounded-2xl hover:bg-[#00512f] transition-all transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
                                                    >
                                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                                        <Send className="w-8 h-8" />
                                                        OPEN IN EMAIL APP
                                                    </a>
                                                    <p className="text-xs text-gray-400 mt-4">
                                                        (We&apos;ll CC the Upper House MPs & Ministers for you automatically!)
                                                    </p>
                                                </div>

                                                <div className="border-t border-gray-100 pt-8">
                                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Manual Copy</span>
                                                        Prefer to copy & paste?
                                                    </h4>
                                                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-blue-800 text-sm mb-6">
                                                        <p className="font-semibold mb-1">💡 Tip:</p>
                                                        <p>A personal story is far more powerful than a template. Use Option 1 below if you have a story to share!</p>
                                                    </div>

                                                    {/* Option 1 */}
                                                    <div className="mb-6">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <h5 className="font-bold text-gray-700 text-sm">Option 1: Personal Story (Recommended)</h5>
                                                            <button
                                                                onClick={() => handleCopy(getTemplate1(selectedMP.name), 'temp1')}
                                                                className="text-xs flex items-center gap-1 text-[#00653b] hover:text-[#00512f] font-medium bg-emerald-50 px-2 py-1 rounded"
                                                            >
                                                                {copied === 'temp1' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                                {copied === 'temp1' ? 'Copied' : 'Copy Text'}
                                                            </button>
                                                        </div>
                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-600 font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
                                                            {getTemplate1(selectedMP.name)}
                                                        </div>
                                                    </div>

                                                    {/* Option 2 */}
                                                    <div>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <h5 className="font-bold text-gray-700 text-sm">Option 2: General Support</h5>
                                                            <button
                                                                onClick={() => handleCopy(getTemplate2(selectedMP.name), 'temp2')}
                                                                className="text-xs flex items-center gap-1 text-[#00653b] hover:text-[#00512f] font-medium bg-emerald-50 px-2 py-1 rounded"
                                                            >
                                                                {copied === 'temp2' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                                {copied === 'temp2' ? 'Copied' : 'Copy Text'}
                                                            </button>
                                                        </div>
                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-600 font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
                                                            {getTemplate2(selectedMP.name)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Phone Content */}
                                        {activeTab === 'phone' && (
                                            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="bg-emerald-50 p-4 rounded-lg">
                                                        <h4 className="font-bold text-[#00653b] mb-2">Key Tips</h4>
                                                        <ul className="text-sm space-y-2 text-gray-700">
                                                            <li>• Be polite, calm, and clear</li>
                                                            <li>• Choose 2–3 key points only</li>
                                                            <li>• You’ll likely speak to a staff member (that’s okay!)</li>
                                                            <li>• Keep it short and focused</li>
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <h4 className="font-bold text-gray-800 mb-2">Who to call</h4>
                                                        <p className="text-gray-600 text-sm mb-4">
                                                            You are calling the office of <strong>{selectedMP.name}</strong>.
                                                        </p>
                                                        {selectedMP.phone ? (
                                                            <a href={`tel:${selectedMP.phone.replace(/\s/g, '')}`} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#00653b] text-white rounded-xl hover:bg-[#00512f] transition-all shadow-md active:scale-95 text-lg font-bold">
                                                                <Phone className="w-5 h-5" />
                                                                Call {selectedMP.phone}
                                                            </a>
                                                        ) : (
                                                            <p className="text-red-500 text-sm">No phone number available for this MP.</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="font-bold text-gray-800">Suggested Script</h4>
                                                        <button
                                                            onClick={() => handleCopy(getPhoneScript(selectedMP.name), 'script')}
                                                            className="text-xs flex items-center gap-1 text-[#00653b] hover:text-[#00512f] font-medium bg-emerald-50 px-2 py-1 rounded"
                                                        >
                                                            {copied === 'script' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                            {copied === 'script' ? 'Copied' : 'Copy Text'}
                                                        </button>
                                                    </div>
                                                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-sm text-gray-600 font-mono whitespace-pre-wrap">
                                                        {getPhoneScript(selectedMP.name)}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {!selectedMP && (
                                    <div className="text-center py-12 text-gray-400 border-t border-gray-100 mt-8">
                                        <p className="flex items-center justify-center gap-2">
                                            <ChevronDown className="w-4 h-4" />
                                            Select an MP from the list above to continue
                                            <ChevronDown className="w-4 h-4" />
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Follow Section */}
                        <div className="mt-16 text-center">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Stay updated on our progress</h3>
                            <div className="flex justify-center gap-6 flex-wrap">
                                <SocialLink href="https://www.facebook.com/BrianWalkerMLC/" icon={Facebook} label="Facebook" />
                                <SocialLink href="https://www.instagram.com/brianwalkermlc/" icon={Instagram} label="Instagram" />
                                <SocialLink href="https://twitter.com/BrianWalkerMLC" icon={Twitter} label="X / Twitter" />
                                <SocialLink href="https://www.linkedin.com/in/brianwalkermlc/" icon={Linkedin} label="LinkedIn" />
                                <SocialLink href="https://www.youtube.com/channel/UCCIGBIf3b385BV5d48Y1U2A?sub_confirmation=1" icon={Youtube} label="YouTube" />
                            </div>
                            <p className="mt-8 text-sm text-gray-500">Together we can make the roads safer and fairer for everyone.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
