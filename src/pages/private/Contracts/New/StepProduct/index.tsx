// ./src/pages/privates/Contract/New/StepProduct/index.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { IoCubeOutline } from 'react-icons/io5';

import {
  ButtonDefault,
  ButtonMain,
  CardSimpleIndicatorSelectable,
  LoadingForm,
  Paragraph,
  SubtitleSecondary,
} from '@components/index';
import { ConfigStyles, ConfigValues } from '@config/index';
import Product from '@models/Product';
import { newContractStorageService, apiRebox } from '@services/index';
import { formatText } from '@utils/formatters';
import { toastify } from '@utils/notifiers';

import CardProduct from './Card';

import { Container, Group, Buttons } from './styles';

interface IProps {
  myStep: number;
  currentStep: number;
  changeStep(newStep: number, willChangeHistory?: boolean): void;
}

interface ISaveProduct {
  productId?: string;
  classification?: string;
}

const StepProduct: React.FC<IProps> = ({ myStep, currentStep, changeStep }) => {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    newContractStorageService.getProduct().id,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = useCallback(async () => {
    try {
      setLoading(prevState => !prevState);
      const { data: response } = await apiRebox.get(
        `/products?type=${ConfigValues.rebox.product.type.plan}&status=${ConfigValues.rebox.product.status.active}&details=all`,
      );
      setProducts(response.data);
    } catch (error) {
      toastify(
        `Houve um error ao buscar lista de opções de produtos.`,
        'error',
      );
    } finally {
      setLoading(prevState => !prevState);
    }
  }, []);

  const handleSaveProduct = useCallback(
    ({ productId, classification }: ISaveProduct) => {
      const id = productId || '';
      newContractStorageService.updateProduct({
        id,
        field_type: 'PRODUCT_ID',
        query: classification || '',
      });
      setSelectedProductId(id);
      buttonsRef.current?.scrollIntoView();
    },
    [],
  );

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <SubtitleSecondary textAlign="start" nameColor="black">
        Produtos
      </SubtitleSecondary>
      <Paragraph
        textAlign="start"
        nameColor="black"
        opacity={0.8}
        fontWeight={500}
      >
        Escolha um de nossos produtos para prosseguir
      </Paragraph>
      {loading ? (
        <LoadingForm />
      ) : (
        <>
          {!products.length ? (
            <Paragraph
              textAlign="center"
              nameColor="black"
              opacity={1}
              fontWeight={500}
              style={{ marginTop: '2vh' }}
            >
              Nenhum produto foi encontrado
            </Paragraph>
          ) : (
            <Group>
              {products.map(item => (
                <CardProduct
                  key={item.id}
                  product={item}
                  onClick={() =>
                    handleSaveProduct({
                      productId: item?.id,
                      classification: item.classification,
                    })
                  }
                  isSelected={selectedProductId === item?.id}
                />
              ))}
            </Group>
          )}
        </>
      )}
      <Buttons ref={buttonsRef}>
        <ButtonMain
          onClick={() => changeStep(currentStep + 1)}
          style={{ marginRight: '10px', maxWidth: 200 }}
          disabled={!selectedProductId}
          isDisable={!selectedProductId}
        >
          Avançar
        </ButtonMain>
        <ButtonDefault
          onClick={() => changeStep(currentStep - 1)}
          style={{ maxWidth: 200 }}
          disabled={currentStep <= 1}
          isDisable={currentStep <= 1}
        >
          Voltar
        </ButtonDefault>
      </Buttons>
    </Container>
  );
};

export default StepProduct;
