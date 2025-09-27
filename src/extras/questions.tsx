import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { CareWorker, Cleaning, Company, Cooking, Snowplowing, Supporting } from "../../assets/image/services"
import { Care1, Care2, Care3, CareWork, Clean1, Clean2, Clean3, Cook1, Cook2, Cook3, Cook4, HouseClean, PCook, Snow1, Snow2, Snow3, Snow4, Snowplow, Support1, Support2, Worker1, Worker2 } from "../../assets/image/services/subservice"

export const faqQuestions = [
    {
        key: "1",
        question: "Is there a free trial available?",
        answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
    },
    {
        key: "2",
        question: "Can I change my plan later?",
        answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
    },
    {
        key: "3",
        question: "Is there a free trial available?",
        answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
    },
    {
        key: "4",
        question: "What is your cancellation policy?",
        answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
    },
    {
        key: "5",
        question: "Can other info be added to an invoice?",
        answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
    },
    {
        key: "6",
        question: "How do I change my account email?",
        answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
    }
]

export interface serviceType {
    key: string;
    id: string;
    title: string;
    description: string;
    services: string[];
    services2: string[];
    image: string | StaticImport;
    images: string[] | StaticImport[];
    more: {
        image: string | StaticImport;
        name: string;
        description: string;
        service: string[];
        link: string;
    }[];
}
export const serviceTypes = [
    {
        key: "1",
        id: "care-workers",
        title: "Care Workers",
        description: "Professional personal care and support for seniors and individuals with disabilities.",
        services: [
            "Personal hygiene assistance",
            "Medication management",
            "Mobility and transfer assistance",
            "Companionship and social interaction",
        ],
        services2: [ "Light housekeeping",
            "Meal preparation",
            "Transportation to appointments",
            "Respite care for families"],
        image: CareWorker,
        images: [Care1, Care2, Care3],
        more: [
            {
                image: Snowplow,
                name: "Snow Plowing",
                description: "Reliable snow removal experts for your comfort and safety.",
                service: ["Evening snow plowing", "Weekend snow clearing"],
                link: "/service/snow-plowing"
            },
            {
                image: PCook,
                name: "Personal Cooks",
                description: "Professional meal preparation and cooking services",
                service: ["Meal planning", "Special diets"],
                link: "/service/personal-cooks"
            },
            {
                image: HouseClean,
                name: "House Chores & Cleaning",
                description: "Comprehensive home maintenance and cleaning services",
                service: ["Deep cleaning", "Regular maintenance"],
                link: "/service/house-chores"
            }
        ]
    },
    {
        key: "2",
        id: "snow-plowings",
        title: "snow Plowings",
        description: "Reliable snow removal experts for your comfort and safety.",
        services: [
            "Evening and weekend snow removal services.",
            "Snow removal during after-school hours.",
            "Transport to winter activities.",
            "Quick snow removal services.",
        ],
        services2: [ "Careful snow shoveling around play areas.",
            "Overnight snow removal services available."],
        image: Snowplowing,
        images: [Snow1, Snow2, Snow3, Snow4],
        more: [
            {
                image: CareWork,
                name: "Care Worker",
                description: "Professional personal care and support for seniors and individuals with disabilities",
                service: ["Evening babysitting","After-school care"],
                link: "/service/care-workers"
            },
            {
                image: PCook,
                name: "Personal Cooks",
                description: "Professional meal preparation and cooking services",
                service: ["Meal planning", "Special diets"],
                link: "/service/personal-cooks"
            },
            {
                image: HouseClean,
                name: "House Chores & Cleaning",
                description: "Comprehensive home maintenance and cleaning services",
                service: ["Deep cleaning", "Regular maintenance"],
                link: "/service/house-chores"
            }
        ]
    },
    {
        key: "3",
        id: "personal-cooks",
        title: "Personal Cook",
        description: "Professional meal preparation and cooking services",


        services: [
            "Custom meal planning and preparation",
            "Special dietary requirements",
            "Grocery shopping and meal prep",
            "Kitchen organization and cleanup",
        ],
        services2: [ "Freezer meal preparation",
            "Cooking lessons and demonstrations", "Event and party catering", "Nutritional consultation"],
        image: Cooking,
        images: [Cook1, Cook2, Cook3, Cook4],
        more: [
            {
                image: Snowplow,
                name: "Snow Plowing",
                description: "Reliable snow removal experts for your comfort and safety.",
                service: ["Evening snow plowing", "Weekend snow clearing"],
                link: "/service/snow-plowing"
            },
            {
                image: CareWork,
                name: "Care Worker",
                description: "Professional personal care and support for seniors and individuals with disabilities",
                service: ["Evening babysitting","After-school care"],
                link: "/service/care-workers"
            },
            {
                image: HouseClean,
                name: "House Chores & Cleaning",
                description: "Comprehensive home maintenance and cleaning services",
                service: ["Deep cleaning", "Regular maintenance"],
                link: "/service/house-chores"
            }
        ]
    },
    {
        key: "4",
        id: "house-chores",
        title: "House Chores & Cleaning",
        description: "Comprehensive home maintenance and cleaning services",
        services: [
            "Deep cleaning and regular maintenance",
            "Move-in/move-out cleaning",
            "Laundry and ironing services",
            "Post-construction cleanup",
        ],
        services2: [ "Organization and decluttering",
            "Seasonal home maintenance", "Window and carpet cleaning", "Pet-friendly cleaning options"],
        image: Cleaning,
        images: [Clean1, Clean2, Clean3],
        more: [
            {
                image: Snowplow,
                name: "Snow Plowing",
                description: "Reliable snow removal experts for your comfort and safety.",
                service: ["Evening snow plowing", "Weekend snow clearing"],
                link: "/service/snow-plowing"
            },
            {
                image: CareWork,
                name: "Care Worker",
                description: "Professional personal care and support for seniors and individuals with disabilities",
                service: ["Evening babysitting","After-school care"],
                link: "/service/care-workers"
            },
            {
                image: PCook,
                name: "Personal Cooks",
                description: "Professional meal preparation and cooking services",
                service: ["Meal planning", "Special diets"],
                link: "/service/personal-cooks"
            },
        ]
    },
    {
        key: "5",
        id: "support-workers",
        title: "Support Workers",
        description: "Specialized support for daily living and independence",
        services: [
            "Daily living skills support",
            "Community integration assistance",
            "Advocacy and rights support",
            "Life skills development",
        ],
        services2: [ "Social participation support",
            "Crisis intervention", "Goal-oriented support planning", "Family support and education"],
        image: Supporting,
        images: [Support1, Support2],
        more: [
            {
                image: Snowplow,
                name: "Snow Plowing",
                description: "Reliable snow removal experts for your comfort and safety.",
                service: ["Evening snow plowing", "Weekend snow clearing"],
                link: "/service/snow-plowing"
            },
            {
                image: CareWork,
                name: "Care Worker",
                description: "Professional personal care and support for seniors and individuals with disabilities",
                service: ["Evening babysitting","After-school care"],
                link: "/service/care-workers"
            },
            {
                image: PCook,
                name: "Personal Cooks",
                description: "Professional meal preparation and cooking services",
                service: ["Meal planning", "Special diets"],
                link: "/service/personal-cooks"
            },
        ]
    },
    {
        key: "6",
        id: "companion-workers",
        title: "Companion Workers",
        description: "Social companionship and emotional support services",
        services: [
            "Social companionship and conversation",
            "Recreational activities and outings",
            "Light housekeeping assistance",
            "Appointment and errand assistance",
        ],
        services2: [ "Technology support and tutoring",
            "Reading and hobby companionship", "Pet care assistance", "Emotional support and friendship"],
        image: Company,
        images: [Worker1, Worker2],
        more: [
            {
                image: Snowplow,
                name: "Snow Plowing",
                description: "Reliable snow removal experts for your comfort and safety.",
                service: ["Evening snow plowing", "Weekend snow clearing"],
                link: "/service/snow-plowing"
            },
            {
                image: CareWork,
                name: "Care Worker",
                description: "Professional personal care and support for seniors and individuals with disabilities",
                service: ["Evening babysitting","After-school care"],
                link: "/service/care-workers"
            },
            {
                image: PCook,
                name: "Personal Cooks",
                description: "Professional meal preparation and cooking services",
                service: ["Meal planning", "Special diets"],
                link: "/service/personal-cooks"
            },
        ]
    },
]