"use client"

import { CodeExampleSection } from "@/components/sections/hakaton/CodeExampleSection"
import { DatasetSection } from "@/components/sections/hakaton/DatasetSection"
import { FAQSection } from "@/components/sections/hakaton/FAQSection"
import { HackathonHero } from "@/components/sections/hakaton/HackathonHero"
import { OrganizersSection } from "@/components/sections/hakaton/OrganizersSection"
import { ParticipationRulesSection } from "@/components/sections/hakaton/ParticipationRulesSection"
import { TaskDescriptionSection } from "@/components/sections/hakaton/TaskDescriptionSection"


export default function Hakaton() {
    return (
        <>
            <HackathonHero />
            <TaskDescriptionSection />
            <CodeExampleSection />
            <DatasetSection />
            <ParticipationRulesSection />
            <FAQSection />
            <OrganizersSection />
        </>
    )
}