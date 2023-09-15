
import { render, screen } from '@testing-library/react'
import 'cross-fetch/polyfill';
import Home from "../page";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { renderServerComponent } from '../../lib/renderServerComponent';

const sumRealStats = async (lv: number) => {
  const stats = [];
  stats.push((await screen.findByTestId(`lv${lv}-hp`)).textContent);
  stats.push((await screen.findByTestId(`lv${lv}-str`)).textContent);
  stats.push((await screen.findByTestId(`lv${lv}-mag`)).textContent);
  stats.push((await screen.findByTestId(`lv${lv}-skl`)).textContent);
  stats.push((await screen.findByTestId(`lv${lv}-spd`)).textContent);
  stats.push((await screen.findByTestId(`lv${lv}-lck`)).textContent);
  stats.push((await screen.findByTestId(`lv${lv}-def`)).textContent);
  stats.push((await screen.findByTestId(`lv${lv}-res`)).textContent);

  const realStats = stats.map((value, i) => {
    let v;
    if (value) {
      v = parseFloat(value);
    } else {
      v = value;
    }
    return v;
  });
  return realStats;
};

describe('Home', () => {
  it('calculating stats (benny)', async () => {
    const user = userEvent.setup()
    await renderServerComponent(<Home />);

    await screen.findByText('218.2'); // corrin's default sum stats in level 40 has been rendered?

    await user.selectOptions(screen.getByTestId('unit-select'), screen.getByTestId('unit-select-benny'));

    const text = await screen.findByText('213.35');

    const realStats = await sumRealStats(40);
    const ideals = [51.75,	32.40,	0.00,	32.00,	8.65,	23.80,	41.00,	23.75];
    expect(realStats).toEqual(ideals);

  }, 20000);

  it('calculating stats (rhajat, nyx)', async () => {
    const user = userEvent.setup()
    await renderServerComponent(<Home />);

    await screen.findByText('218.2'); // corrin's sum stats in level 40 has been rendered?

    await user.selectOptions(screen.getByTestId('unit-select'), screen.getByTestId('unit-select-rhajat'));

    const parentSelect = await screen.findByTestId('parent-select');
    user.selectOptions(parentSelect, screen.getByTestId('parent-select-nyx'));

    const text = await screen.findByText('185.65');

    const realStats = await sumRealStats(40);
    const ideals = [34.15,	4.4,	38,	15.43,	32.85,	15.75,	13.8,	31.28];
    expect(realStats).toEqual(ideals);

  }, 20000);


  it('calculating stats (kana, rhajat, nyx, mp20-nohr_noble)', async () => {
    const user = userEvent.setup()
    await renderServerComponent(<Home />);

    await screen.findByText('218.2'); // corrin's sum stats in level 40 has been rendered?

    await user.selectOptions(screen.getByTestId('unit-select'), screen.getByTestId('unit-select-kana'));

    // const parentSelect = await screen.findByTestId('parent-select');
    user.selectOptions(await screen.findByTestId('parent-select'), screen.getByTestId('parent-select-rhajat'));

    // const grandParentSelect = await screen.findByTestId('grand-parent-select');
    user.selectOptions(await screen.findByTestId('grand-parent-select'), screen.getByTestId('grand-parent-select-nyx'));

    const text = await screen.findByText('209.77');

    const realStats = await sumRealStats(40);
    const ideals = [39.78,	23.88,	25.22,	24.96,	30.67,	26.05,	22.38,	16.84	];
    expect(realStats).toEqual(ideals);

    user.selectOptions(screen.getByTestId('mp20-select'), screen.getByTestId('mp20-select-nohr_noble'));
    await screen.findByText('208.77');

    const realStats2 = await sumRealStats(40);
    const ideals2 = [
      38.78,	
      20.92 /* 20.925 -> 20.93 in Excel but 20.92499999999999 -> 20.92 in JavaScript */,	
      28.17 /* 28.175 -> 28.18 in Excel but 28.17499999999999 -> 28.17 in JavaScript */,	
      23.01,	
      32.62 /* 32.625  -> 32.63 in Excel but 32.62499999999999 -> 32.62 in JavaScript */,	
      23.1,	
      19.48,	
      22.69	
    ];
    expect(realStats2).toEqual(ideals2);

  }, 20000);


  it('calculating stats (mozu, pp10-archer, mp20-sniper, aptitude on/off)', async () => {
    const user = userEvent.setup()
    await renderServerComponent(<Home />);

    await screen.findByText('218.2'); // corrin's sum stats in level 40 has been rendered?

    await user.selectOptions(screen.getByTestId('unit-select'), screen.getByTestId('unit-select-mozu'));

    await screen.findByText('290');

    user.selectOptions(screen.getByTestId('pp10-select'), screen.getByTestId('pp10-select-archer'));
    user.selectOptions(screen.getByTestId('mp20-select'), screen.getByTestId('mp20-select-sniper'));

    await screen.findByText('215.95');

    const realStats = await sumRealStats(40);
    const ideals = [37,	31,	5.7,	36,	34,	27.15,	26.9,	18.2	];
    expect(realStats).toEqual(ideals);

    const aptitude0 = screen.getByTestId('aptitude-0');
    user.click(aptitude0);

    await screen.findByText('194.4');

    const realStats2 = await sumRealStats(40);
    const ideals2 = [33.2,	28.45,	1.9,	36,	34,	23.35,	23.1,	14.4];
    expect(realStats2).toEqual(ideals2);

    user.click(aptitude0);

    await screen.findByText('215.95');

    const realStats3 = await sumRealStats(40);
    expect(realStats3).toEqual(ideals);

  }, 20000);

  it('calculating stats (ophelia, strength-mag, weakness-str, pp10-witch + pp40-sorcerer)', async () => {
    const user = userEvent.setup()
    await renderServerComponent(<Home />);

    await screen.findByText('218.2'); // corrin's sum stats in level 40 has been rendered?

    user.selectOptions(screen.getByTestId('strength-select'), screen.getByTestId('strength-select-mag'));
    user.selectOptions(screen.getByTestId('weakness-select'), screen.getByTestId('weakness-select-str'));
    await user.selectOptions(screen.getByTestId('unit-select'), screen.getByTestId('unit-select-ophelia'));

    await screen.findByText('312.5');
    const realStats = await sumRealStats(40);
    const ideals = [37.05,	11.25,	35.53,	20.88/** */,	29.67/** */,	28,	15.7,	25.55	];
    expect(realStats).toEqual(ideals);

    user.selectOptions(screen.getByTestId('pp10-select'), screen.getByTestId('pp10-select-witch'));
    user.selectOptions(screen.getByTestId('mp20-select'), screen.getByTestId('mp20-select-0'));
    await screen.findByText('212.5');
    
    const realStats2 = await sumRealStats(40);
    const ideals2 = [39,	10.5,	37.75,	23.75,	36,	30,	13.5, 22	];
    expect(realStats2).toEqual(ideals2);

    user.selectOptions(screen.getByTestId('pp40-select'), screen.getByTestId('pp40-select-sorcerer'));
    await screen.findByText('207.5');
    const realStats3 = await sumRealStats(40);
    const ideals3 = [39,	10.5,	36.75,	22.75,	31,	28,	14.5,	25	];
    expect(realStats3).toEqual(ideals3);

  }, 20000);

  it('calculating stats (selena, mp10-bow_knight)', async () => {
    const user = userEvent.setup()
    await renderServerComponent(<Home />);
  
    await screen.findByText('218.2'); // corrin's sum stats in level 40 has been rendered?
  
    await user.selectOptions(screen.getByTestId('unit-select'), screen.getByTestId('unit-select-selena'));
    await screen.findByText('204.25');

    user.selectOptions(screen.getByTestId('mp20-select'), screen.getByTestId('mp20-select-bow_knight'));
    await screen.findByText('198.4');

    const realStats = await sumRealStats(40);
    const ideals = [39.5,	25.1,	4.45,	25.1,	35,	21.1,	25.05,	23.1	];
    expect(realStats).toEqual(ideals);
  
    user.selectOptions(screen.getByTestId('mp10-select'), screen.getByTestId('mp10-select-bow_knight'));
    await screen.findByText('165.8');
    
    const realStats2 = await sumRealStats(40);
    const ideals2 = [34.5,	20.6,	3.95,	20.6,	29.4,	17.6,	19.55,	19.6	];
    expect(realStats2).toEqual(ideals2);
  
  }, 20000);


  it('calculating stats (unit-select-gunter, ep)', async () => {
    const user = userEvent.setup()
    await renderServerComponent(<Home />);
  
    await screen.findByText('218.2'); // corrin's sum stats in level 40 has been rendered?
  
    await user.selectOptions(screen.getByTestId('unit-select'), screen.getByTestId('unit-select-gunter'));
    await screen.findByText('102.1');

    await user.click(screen.getByTestId('ep-button'));
    await screen.findByText('108.6');

    const realStats = await sumRealStats(45);
    const ideals = [31.7,	15.5,	0,	18.3,	9.1,	13.4,	15.5,	5.1	];
    expect(realStats).toEqual(ideals);

    await user.click(screen.getByTestId('ep-button'));
    await user.click(screen.getByTestId('ep-button'));
  
    await screen.findByText('121.6');
    
    const realStats2 = await sumRealStats(55);
    const ideals2 = [35.2,	18,	0,	19.8,	9.6,	15.4,	18,	5.6	];
    expect(realStats2).toEqual(ideals2);

    // lv 120(100 in upper class)
    for (let i = 0; i < 13; i++) {
      await user.click(screen.getByTestId('ep-button'));
    }
    await screen.findByText('205.7');
    const realStats3 = await sumRealStats(119);
    const ideals3 = [57.6,	34,	0,	29.4,	12.8,	28,	34,	8.8];
    expect(realStats3).toEqual(ideals3);
  
  }, 20000);
});

