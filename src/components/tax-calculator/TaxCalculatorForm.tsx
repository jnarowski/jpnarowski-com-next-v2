import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { StrategyCard } from './StrategyCard';
import { type TaxCalculatorState } from '@/lib/tax-calculator';

interface TaxCalculatorFormProps {
  state: TaxCalculatorState;
  onChange: (state: TaxCalculatorState) => void;
}

export function TaxCalculatorForm({ state, onChange }: TaxCalculatorFormProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const parseCurrency = (value: string) => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  return (
    <div className="space-y-6">
      {/* Base Income Section */}
      <div className="p-6 rounded-2xl bg-muted/30 border-2 border-border space-y-4">
        <h3 className="text-lg font-bold">Income Details</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="w2Income" className="text-sm font-medium">
              Annual W-2 Income (Base Salary)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="w2Income"
                type="text"
                className="pl-7 font-mono"
                value={formatCurrency(state.baseIncome.w2Income)}
                onChange={(e) => {
                  const value = parseCurrency(e.target.value);
                  onChange({
                    ...state,
                    baseIncome: { ...state.baseIncome, w2Income: value },
                  });
                }}
                placeholder="200,000"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Your regular annual salary or W-2 income
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phantomEquity" className="text-sm font-medium">
              Phantom Equity Payout (One-Time)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="phantomEquity"
                type="text"
                className="pl-7 font-mono"
                value={formatCurrency(state.baseIncome.phantomEquityPayout)}
                onChange={(e) => {
                  const value = parseCurrency(e.target.value);
                  onChange({
                    ...state,
                    baseIncome: {
                      ...state.baseIncome,
                      phantomEquityPayout: value,
                    },
                  });
                }}
                placeholder="500,000"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              One-time compensation event (phantom equity, bonus, etc.)
            </p>
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-sm font-medium">Total Income</p>
            <p className="text-2xl font-bold text-primary">
              ${formatCurrency(state.baseIncome.w2Income + state.baseIncome.phantomEquityPayout)}
            </p>
          </div>
        </div>
      </div>

      {/* Strategy Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Tax Reduction Strategies</h3>

        {/* Business Loss Strategy */}
        <StrategyCard
          title="Active Business Loss"
          description="Deduct losses from active trade or business activities (Section 162)"
          enabled={state.businessLoss.enabled}
          onEnabledChange={(enabled) =>
            onChange({
              ...state,
              businessLoss: { ...state.businessLoss, enabled },
            })
          }
        >
          <div className="space-y-2">
            <Label htmlFor="businessLoss" className="text-sm font-medium">
              Total Active Business Losses
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="businessLoss"
                type="text"
                className="pl-7 font-mono"
                value={formatCurrency(state.businessLoss.lossAmount)}
                onChange={(e) => {
                  const value = parseCurrency(e.target.value);
                  onChange({
                    ...state,
                    businessLoss: { ...state.businessLoss, lossAmount: value },
                  });
                }}
                placeholder="200,000"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Active losses from businesses where you materially participate
            </p>
          </div>
        </StrategyCard>

        {/* Real Estate Professional Strategy */}
        <StrategyCard
          title="Real Estate Professional"
          description="Deduct passive real estate losses if you qualify as a Real Estate Professional"
          enabled={state.realEstateProfessional.enabled}
          onEnabledChange={(enabled) =>
            onChange({
              ...state,
              realEstateProfessional: {
                ...state.realEstateProfessional,
                enabled,
              },
            })
          }
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isREP"
                checked={state.realEstateProfessional.isREP}
                onCheckedChange={(checked) =>
                  onChange({
                    ...state,
                    realEstateProfessional: {
                      ...state.realEstateProfessional,
                      isREP: checked === true,
                    },
                  })
                }
              />
              <Label
                htmlFor="isREP"
                className="text-sm font-medium cursor-pointer"
              >
                I qualify as a Real Estate Professional
              </Label>
            </div>
            <p className="text-xs text-muted-foreground">
              Requires 750+ hours in real estate activities and &gt;50% of work
              time in real estate
            </p>

            <div className="space-y-2">
              <Label htmlFor="passiveLosses" className="text-sm font-medium">
                Total Passive Losses from Real Estate
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="passiveLosses"
                  type="text"
                  className="pl-7 font-mono"
                  value={formatCurrency(
                    state.realEstateProfessional.passiveLosses
                  )}
                  onChange={(e) => {
                    const value = parseCurrency(e.target.value);
                    onChange({
                      ...state,
                      realEstateProfessional: {
                        ...state.realEstateProfessional,
                        passiveLosses: value,
                      },
                    });
                  }}
                  placeholder="150,000"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Only deductible if REP qualification is met
              </p>
            </div>
          </div>
        </StrategyCard>

        {/* Oil & Gas Investment Strategy */}
        <StrategyCard
          title="Oil & Gas Investment"
          description="Immediate deduction of Intangible Drilling Costs (IDC) from direct participation"
          enabled={state.oilInvestment.enabled}
          onEnabledChange={(enabled) =>
            onChange({
              ...state,
              oilInvestment: { ...state.oilInvestment, enabled },
            })
          }
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="oilInvestment" className="text-sm font-medium">
                Total Investment Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="oilInvestment"
                  type="text"
                  className="pl-7 font-mono"
                  value={formatCurrency(state.oilInvestment.investmentAmount)}
                  onChange={(e) => {
                    const value = parseCurrency(e.target.value);
                    onChange({
                      ...state,
                      oilInvestment: {
                        ...state.oilInvestment,
                        investmentAmount: value,
                      },
                    });
                  }}
                  placeholder="300,000"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Investment in oil/gas direct participation program
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="idcPercentage" className="text-sm font-medium">
                  IDC Percentage: {state.oilInvestment.idcPercentage}%
                </Label>
                <span className="text-xs text-muted-foreground font-mono">
                  ${formatCurrency((state.oilInvestment.investmentAmount * state.oilInvestment.idcPercentage) / 100)}
                </span>
              </div>
              <Slider
                id="idcPercentage"
                min={70}
                max={85}
                step={1}
                value={[state.oilInvestment.idcPercentage]}
                onValueChange={([value]) =>
                  onChange({
                    ...state,
                    oilInvestment: {
                      ...state.oilInvestment,
                      idcPercentage: value,
                    },
                  })
                }
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Typical range: 70-85% of investment is deductible as IDC
              </p>
            </div>
          </div>
        </StrategyCard>
      </div>
    </div>
  );
}
