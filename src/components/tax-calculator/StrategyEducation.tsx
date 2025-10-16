import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ExternalLink } from 'lucide-react';

export function StrategyEducation() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle>Understanding Tax Strategies</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {/* Business Loss Strategy */}
          <AccordionItem value="business-loss">
            <AccordionTrigger className="text-left">
              <div>
                <p className="font-semibold">Active Business Loss Strategy</p>
                <p className="text-sm text-muted-foreground">
                  Section 162 trade or business deductions
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="font-semibold text-sm mb-2">What it is:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Active trade or business losses under Section 162 of the tax
                    code. These are losses from businesses where you materially
                    participate in the operations.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Who qualifies:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Business owners with material participation</li>
                    <li>Active involvement in day-to-day operations</li>
                    <li>Not passive investors or limited partners</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">How it works:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Active business losses directly reduce your ordinary income
                    without limitation. Unlike passive losses, there&apos;s no cap on
                    how much you can deduct in a given year.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Important considerations:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Must be from an active trade or business</li>
                    <li>Material participation is required</li>
                    <li>Not applicable to hobby losses</li>
                    <li>Losses must be legitimate business expenses</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Real Estate Professional Strategy */}
          <AccordionItem value="real-estate-professional">
            <AccordionTrigger className="text-left">
              <div>
                <p className="font-semibold">Real Estate Professional Strategy</p>
                <p className="text-sm text-muted-foreground">
                  IRS designation for passive loss deductions
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="font-semibold text-sm mb-2">What it is:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The Real Estate Professional (REP) designation allows
                    individuals to deduct passive losses from rental real estate
                    activities against ordinary income. Normally, passive losses
                    can only offset passive income.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Who qualifies:</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    To qualify as a Real Estate Professional, you must meet BOTH
                    requirements:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>
                      <strong>750+ hours:</strong> Spend at least 750 hours per
                      year in real estate activities
                    </li>
                    <li>
                      <strong>&gt;50% of time:</strong> More than half of your
                      personal services time must be in real estate
                    </li>
                    <li>
                      <strong>Material participation:</strong> Must materially
                      participate in each rental activity
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">How it works:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Once qualified as a REP and meeting material participation
                    requirements, your rental real estate losses are reclassified
                    from passive to active. This allows you to deduct these losses
                    against your W-2 income and other ordinary income.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Important considerations:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Strict documentation requirements (time logs, activity records)</li>
                    <li>Must re-qualify every year</li>
                    <li>Material participation test must be met for each property</li>
                    <li>Married couples filing jointly: only one spouse needs to qualify</li>
                    <li>W-2 employees may struggle to meet the 50% requirement</li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-border">
                  <a
                    href="https://www.irs.gov/publications/p925"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    IRS Publication 925 (Passive Activity Rules)
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Oil & Gas Investment Strategy */}
          <AccordionItem value="oil-gas-investment">
            <AccordionTrigger className="text-left">
              <div>
                <p className="font-semibold">Oil & Gas Investment Strategy</p>
                <p className="text-sm text-muted-foreground">
                  Intangible Drilling Costs (IDC) deductions
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="font-semibold text-sm mb-2">What it is:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Intangible Drilling Costs (IDC) are costs associated with
                    drilling that have no salvage value. These include labor,
                    fuel, repairs, supplies, and other costs necessary to prepare
                    a well for production. Typically 70-85% of total drilling
                    costs are classified as intangible.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Who qualifies:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>
                      <strong>Direct participation:</strong> Must invest in direct
                      participation programs (DPPs), not limited partnerships
                    </li>
                    <li>Investors in working interests of oil/gas wells</li>
                    <li>Active participation in the investment required</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">How it works:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    IDCs can be deducted in full in the year they&apos;re incurred,
                    providing an immediate tax benefit. The remaining 15-30%
                    (tangible costs like equipment) are capitalized and
                    depreciated over 7 years. This creates a significant first-year
                    deduction.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Example calculation:</h4>
                  <div className="bg-muted/30 p-3 rounded-lg text-sm font-mono">
                    <p>$300,000 investment × 80% IDC = $240,000 deduction</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      (Remaining $60,000 depreciated over 7 years)
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Important considerations:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>High-risk investment - drilling may not be successful</li>
                    <li>Requires direct participation (not passive)</li>
                    <li>Subject to Alternative Minimum Tax (AMT) in some cases</li>
                    <li>Complex investment with significant capital requirements</li>
                    <li>Future income from production is taxable</li>
                    <li>Consult with specialized oil & gas tax professionals</li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-border bg-yellow-500/10 p-3 rounded-lg">
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    <strong>Note:</strong> Oil & gas investments are complex,
                    high-risk ventures. This calculator provides simplified
                    estimates and should not replace professional due diligence.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
