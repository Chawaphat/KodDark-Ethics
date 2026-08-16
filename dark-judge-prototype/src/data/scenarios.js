// Dark Judge — scenario + dark-pattern content model
// category: 'transparency' | 'autonomy' | 'fairness'  → feeds the Ethics Score Dashboard

export const scenarios = [
  {
    id: 'checkout',
    title: 'The "Free Shipping" Checkout',
    tag: 'E-Commerce • Hidden Costs',
    difficulty: 'Easy',
    teaser: 'A sneaker checkout that looked like $89.99... until it didn\'t.',
    briefing:
      "You're buying a pair of limited sneakers advertised at $89.99 with \"free shipping.\" Play through the checkout and click on anything that looks like it's trying to trick you.",
    totalHotspots: 4,
    component: 'CheckoutMock',
    hotspots: {
      'preselected-addon': {
        patternName: 'Sneak into Basket',
        category: 'fairness',
        explanation:
          "\"Priority Protection Plan (+$6.99)\" was pre-checked before you even reached checkout. Users scanning quickly rarely notice a box that's already ticked, so an item gets added without a real, active choice — the opposite of fair, informed consent.",
      },
      'hidden-fee-reveal': {
        patternName: 'Hidden Costs / Drip Pricing',
        category: 'transparency',
        explanation:
          "A \"Processing & Handling Fee\" of $7.49 only appears at the final payment step — after you've already invested time filling out your details. This is called drip pricing: revealing costs bit by bit so you're less likely to walk away (a sunk-cost / commitment trap).",
      },
      'fake-free-shipping': {
        patternName: 'Bait and Switch',
        category: 'transparency',
        explanation:
          "The banner still says \"FREE SHIPPING\" but a $4.99 \"express handling\" charge was quietly added to the total — shipping isn't really free, the cost was just renamed. Advertising one deal and delivering another erodes trust and informed decision-making.",
      },
      'tiny-decline-link': {
        patternName: 'Visual Interference / Asymmetric Choice',
        category: 'autonomy',
        explanation:
          "\"No thanks, I'll pay full price later\" is rendered as 6px grey text, while \"Yes, upgrade my order!\" is a large, high-contrast button. Making one path effortless and the other nearly invisible manipulates the choice architecture instead of presenting options fairly.",
      },
    },
    redesign: {
      prompt:
        'The checkout team asks you to fix this page. Which redesign best respects the shopper?',
      options: [
        {
          id: 'a',
          label: 'Show the full price — including all fees — right on the product page, before checkout even starts.',
          isEthical: true,
          feedback:
            "Correct. Upfront, all-inclusive pricing means the shopper's decision at add-to-cart time is already the real decision — nothing changes later to catch them off guard.",
        },
        {
          id: 'b',
          label: 'Keep the low headline price, but make the fee text slightly bigger (10px instead of 6px) at the final step.',
          isEthical: false,
          feedback:
            'This still hides the true cost until the user is committed — a bigger font doesn\'t fix drip pricing, it just makes it marginally less sneaky.',
        },
        {
          id: 'c',
          label: 'Add a "Skip the fees" premium membership upsell right before the fee reveal.',
          isEthical: false,
          feedback:
            'This monetizes the confusion you created rather than removing it — it treats the dark pattern as a feature to sell around, not a problem to fix.',
        },
      ],
    },
  },
  {
    id: 'flashsale',
    title: 'The Flash Sale That Never Ends',
    tag: 'Retail • Fake Urgency',
    difficulty: 'Medium',
    teaser: 'The countdown clock has 3 minutes left. It always has 3 minutes left.',
    briefing:
      "A \"Flash Sale\" landing page for wireless earbuds is pushing you to buy right now. Explore the page and click on anything designed to rush or pressure you.",
    totalHotspots: 4,
    component: 'FlashSaleMock',
    hotspots: {
      'fake-countdown': {
        patternName: 'Fake Urgency',
        category: 'autonomy',
        explanation:
          "This countdown timer resets to 04:59 every time the page reloads. There's no real deadline — it exploits loss aversion, making you fear missing a discount that was never actually expiring.",
      },
      'fake-stock-counter': {
        patternName: 'False Scarcity',
        category: 'transparency',
        explanation:
          "\"Only 2 left in stock!\" stays fixed at 2 no matter how many times you refresh or how many are actually in the warehouse. Fabricated scarcity pressures a decision using information that simply isn't true.",
      },
      'fake-social-proof': {
        patternName: 'Fake Social Proof',
        category: 'transparency',
        explanation:
          "\"14 people are viewing this deal right now\" is a static number hard-coded into the page, not a real visitor count. Fabricated activity feeds borrow the credibility of real social proof without earning it.",
      },
      'tiny-no-thanks': {
        patternName: 'Confirmshaming',
        category: 'autonomy',
        explanation:
          "Declining the deal means clicking \"No, I prefer to pay full price later\" — a sentence written to make the rational choice feel foolish. Guilt-tripping the decline option pressures agreement through emotion, not information.",
      },
    },
    redesign: {
      prompt: 'Which redesign turns this into an honest promotion?',
      options: [
        {
          id: 'a',
          label: 'Show a real, fixed end date/time for the sale and an actual, live-updating stock count pulled from inventory.',
          isEthical: true,
          feedback:
            'Correct. Urgency and scarcity are fine to communicate — as long as they are true. Real data lets the shopper make a real decision.',
        },
        {
          id: 'b',
          label: 'Shorten the fake countdown from 5 minutes to 90 seconds to create more pressure.',
          isEthical: false,
          feedback:
            'This intensifies the manipulation instead of removing it — the deadline is still fabricated.',
        },
        {
          id: 'c',
          label: 'Replace "No thanks, I prefer to pay full price later" with a plain "No thanks" link of equal visual weight to the buy button.',
          isEthical: true,
          feedback:
            'Also correct — neutral wording plus equal visual weight restores a genuine, judgment-free choice.',
        },
      ],
    },
  },
  {
    id: 'cancellation',
    title: 'Canceling "StreamPlus Premium"',
    tag: 'Subscription • Roach Motel',
    difficulty: 'Hard',
    teaser: 'Signing up took one click. Canceling takes... a lot more.',
    briefing:
      "You're trying to cancel a subscription you forgot about. Navigate the settings and click on anything designed to keep you trapped.",
    totalHotspots: 4,
    component: 'CancellationMock',
    hotspots: {
      'buried-cancel-link': {
        patternName: 'Roach Motel',
        category: 'transparency',
        explanation:
          "The cancel option isn't under \"Subscription\" or \"Billing\" — it's hidden three menus deep under Settings → Account → Advanced. Easy to get in, deliberately hard to get out.",
      },
      'confirmshame-button': {
        patternName: 'Confirmshaming',
        category: 'autonomy',
        explanation:
          "The two buttons read \"Yes, keep enjoying my benefits\" vs \"No, I want to lose access to everything.\" Framing cancellation as a loss you must actively accept uses guilt and loss aversion instead of a neutral yes/no.",
      },
      'retention-offer-trap': {
        patternName: 'Forced Continuity / Retention Trap',
        category: 'fairness',
        explanation:
          "Clicking \"cancel\" doesn't cancel — it opens a discount offer that must be dismissed, which opens another offer, which opens a \"pause instead?\" screen. Each extra forced step is a chance to give up before actually canceling.",
      },
      'phone-only-final-step': {
        patternName: 'Obstruction',
        category: 'fairness',
        explanation:
          "After surviving the offers, the final step says \"To complete cancellation, please call our retention line (Mon–Fri, 9–5).\" Signing up was instant and online; canceling requires a phone call during business hours — an asymmetric burden by design.",
      },
    },
    redesign: {
      prompt: 'You\'re asked to redesign the cancellation flow. Which change is most ethical?',
      options: [
        {
          id: 'a',
          label: 'Add a single, clearly-labeled "Cancel subscription" button on the main billing page that cancels in one confirmation step.',
          isEthical: true,
          feedback:
            'Correct. If sign-up is one click, cancellation should be roughly as easy — symmetry between joining and leaving is a core fairness principle.',
        },
        {
          id: 'b',
          label: 'Keep the retention offers, but reduce them from three screens to two.',
          isEthical: false,
          feedback:
            "Reducing friction slightly doesn't remove the underlying pattern — any forced detour before honoring a clear request is still an obstruction.",
        },
        {
          id: 'c',
          label: 'Let users cancel online, and separately (optionally) invite them to hear about a discount afterward via email.',
          isEthical: true,
          feedback:
            'Also correct — decoupling the retention offer from the cancellation flow means the offer no longer blocks the action the user actually asked for.',
        },
      ],
    },
  },
]

export function getScenario(id) {
  return scenarios.find((s) => s.id === id)
}

export const categoryMeta = {
  transparency: { label: 'Transparency', color: '#22d3a5' },
  autonomy: { label: 'User Autonomy', color: '#7c5cff' },
  fairness: { label: 'Fairness', color: '#f5c451' },
}
